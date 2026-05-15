const Course = require('../models/Course');
const Student = require('../models/Student');


const { validationResult } = require('express-validator');

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('enrolledStudents', 'firstName lastName studentId');
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Get course by ID
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('enrolledStudents');
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Create new course
exports.createCourse = async (req, res) => {
    try {
        console.log('Create course request by userId:', req.userId, 'role:', req.userRole);
        console.log('Request headers:', req.headers);
        console.log('Request body:', req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { courseCode, courseName, description, credits, department, semester } = req.body;

        // Check if course code already exists
        const existingCourse = await Course.findOne({ courseCode });
        if (existingCourse) {
            return res.status(400).json({ message: 'Course code already exists' });
        }

        // Create new course
        const course = await Course.create({
            courseCode,
            courseName,
            description,
            credits,
            department,
            semester
        });

        res.status(201).json({
            message: 'Course created successfully',
            course
        });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ 
            message: 'Failed to create course',
            error: error.message 
        });
    }
};


// Update course
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        res.json({ message: 'Course updated successfully', course });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Delete course
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Enroll student in course
exports.enrollStudent = async (req, res) => {
    try {
        const { studentId } = req.body;
        const course = await Course.findById(req.params.courseId);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        // Check if student is already enrolled
        if (course.enrolledStudents.includes(studentId)) {
            return res.status(400).json({ message: 'Student already enrolled' });
        }
        
        // Check if course has reached maximum capacity
        if (course.enrolledStudents.length >= course.maxStudents) {
            return res.status(400).json({ message: 'Course is full' });
        }
        
        course.enrolledStudents.push(studentId);
        await course.save();
        
        res.json({ message: 'Student enrolled successfully', course });
    } catch (error) {
        console.error('Error enrolling student:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

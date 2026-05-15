const Student = require('../models/Student');
const Course = require('../models/Course');
const Grade = require('../models/Grade');

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStudentCourses = async (req, res) => {
  try {
    const courses = await Course.find({ enrolledStudents: req.params.id });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStudentGrades = async (req, res) => {
  try {
    const grades = await Grade.find({ student: req.params.id }).populate('course');
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchStudents = async (req, res) => {
  try {
    const query = req.params.query;
    const students = await Student.find({
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { studentId: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.filterByDepartment = async (req, res) => {
  try {
    const students = await Student.find({ department: req.params.department });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.filterByStatus = async (req, res) => {
  try {
    const students = await Student.find({ status: req.params.status });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPublicStudents = async (req, res) => {
  try {
    const students = await Student.find({}, 'firstName lastName department semester');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

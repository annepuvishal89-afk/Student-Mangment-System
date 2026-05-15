const User = require('../models/User');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Generate JWT Token
const generateToken = (userId, role) => {
    return jwt.sign(
        { userId, role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
    );
};

// Register new user
exports.register = async (req, res) => {
    try {
        console.log('Register request body:', req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, role, studentData } = req.body;
        console.log('Registering user:', { email, password, role, studentData });

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(400).json({ message: 'User already exists' });
        }



        let student = null;
        let user = null;
        const normalizedRole = role ? role.toLowerCase() : 'student';
        if (normalizedRole === 'student') {
            if (!studentData) {
                return res.status(400).json({ message: 'Student data is required for student registration' });
            }
            student = await Student.create({
                ...studentData,
                email
            });
            console.log('Created student:', student);
            user = await User.create({
                email,
                password,
                role: normalizedRole,
                studentId: student._id
            });
        } else {
            // Admin registration
            user = await User.create({
                email,
                password,
                role: normalizedRole
            });
        }
        console.log('Created user:', user);

        // Generate token
        const token = generateToken(user._id, user.role.toLowerCase());

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                studentId: user.studentId
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        if (error && error.stack) {
            console.error(error.stack);
        }
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        console.log('Login request body:', req.body);
        const { email, password } = req.body;
        console.log('Login attempt:', { email, password });

        // Find user
        const user = await User.findOne({ email }).populate('studentId');
        if (!user) {
            console.log('User not found for email:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log('Password mismatch for user:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate token
        const token = generateToken(user._id, user.role);

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                student: user.studentId
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get current user
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('studentId');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                student: user.studentId
            }
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

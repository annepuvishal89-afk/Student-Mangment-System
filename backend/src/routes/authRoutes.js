const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');
const User = require('../models/User'); // Adjust path as needed
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', validateRegister, authController.register);

// Login route
router.post('/login', authController.login);

router.get('/me', authenticate, authController.getMe);

module.exports = router;

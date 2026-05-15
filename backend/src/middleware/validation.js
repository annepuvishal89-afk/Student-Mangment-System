// Always require at the very top
const { body } = require('express-validator');

exports.validateRegister = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
  body('role').isIn(['admin', 'student']).withMessage('Role must be admin or student'),
];

exports.validateLogin = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').exists().withMessage('Password required'),
];

exports.validateStudent = [
  body('firstName').notEmpty().withMessage('First name required'),
  body('lastName').notEmpty().withMessage('Last name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('phone').notEmpty().withMessage('Phone required'),
  body('dateOfBirth').notEmpty().withMessage('Date of birth required'),
  body('department').notEmpty().withMessage('Department required'),
  body('semester').isInt({ min: 1, max: 8 }).withMessage('Semester 1-8'),
];

exports.validateCourse = [
  body('courseCode')
    .trim()
    .notEmpty()
    .withMessage('Course code is required')
    .isLength({ min: 4, max: 10 })
    .withMessage('Course code must be between 4-10 characters'),
    
  body('courseName')
    .trim()
    .notEmpty()
    .withMessage('Course name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Course name must be between 3-100 characters'),
    
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10-500 characters'),
    
  body('credits')
    .isInt({ min: 1, max: 5 })
    .withMessage('Credits must be between 1-5'),
    
  body('department')
    .trim()
    .notEmpty()
    .withMessage('Department is required'),
    
  body('semester')
    .isInt({ min: 1, max: 8 })
    .withMessage('Semester must be between 1-8')
];

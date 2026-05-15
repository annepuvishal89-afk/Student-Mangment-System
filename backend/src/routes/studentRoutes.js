const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticate, authorize } = require('../middleware/auth');
const { validateStudent } = require('../middleware/validation');

// Public routes
router.get('/public', studentController.getPublicStudents);

// Protected routes - require authentication
router.use(authenticate);

// Student routes
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', authorize(['admin']), validateStudent, studentController.createStudent);
router.put('/:id', authorize(['admin']), validateStudent, studentController.updateStudent);
router.delete('/:id', authorize(['admin']), studentController.deleteStudent);
router.get('/:id/courses', studentController.getStudentCourses);
router.get('/:id/grades', studentController.getStudentGrades);

// Search and filter
router.get('/search/:query', studentController.searchStudents);
router.get('/filter/department/:department', studentController.filterByDepartment);
router.get('/filter/status/:status', studentController.filterByStatus);

module.exports = router;

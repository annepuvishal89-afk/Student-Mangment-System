const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

const { authenticate, authorize } = require('../middleware/auth');
const { validateCourse } = require('../middleware/validation');


// Public route
router.get('/', courseController.getAllCourses);

// Protected routes
router.use(authenticate);

router.post('/', authorize(['admin']), validateCourse, courseController.createCourse);
router.get('/:id', courseController.getCourseById);
router.put('/:id', authorize(['admin']), validateCourse, courseController.updateCourse);
router.delete('/:id', authorize(['admin']), courseController.deleteCourse);
router.post('/:courseId/enroll', courseController.enrollStudent);

module.exports = router;

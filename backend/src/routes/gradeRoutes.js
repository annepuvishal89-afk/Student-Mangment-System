const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');
const { authenticate, authorize } = require('../middleware/auth');

router.use(authenticate);


router.get('/', authorize(['admin']), gradeController.getAllGrades);
router.get('/student/:studentId', gradeController.getGradesByStudent);
router.post('/', authorize(['admin']), gradeController.createGrade);
router.delete('/:id', authorize(['admin']), gradeController.deleteGrade);

module.exports = router;

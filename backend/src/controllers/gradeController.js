
// Delete grade by ID
exports.deleteGrade = async (req, res) => {
  try {
    const grade = await Grade.findByIdAndDelete(req.params.id);
    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    res.json({ message: 'Grade deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
const Grade = require('../models/Grade');

exports.getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find().populate('student course');
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getGradesByStudent = async (req, res) => {
  try {
    const grades = await Grade.find({ student: req.params.studentId }).populate('course');
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createGrade = async (req, res) => {
  try {
    const grade = await Grade.create(req.body);
    res.status(201).json(grade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

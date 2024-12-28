const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/', studentController.createStudent);
router.get('/', studentController.getStudents);
router.delete('/:id', studentController.deleteStudent);

// Add other student-related routes as needed

module.exports = router;


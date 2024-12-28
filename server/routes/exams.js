const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.post('/', examController.createExam);
router.get('/', examController.getExams);

// Add other exam-related routes as needed

module.exports = router;


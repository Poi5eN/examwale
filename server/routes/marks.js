const express = require('express');
const router = express.Router();
const markController = require('../controllers/markController');

router.post('/', markController.addMark);
router.get('/', markController.getMarks);

// Add other mark-related routes as needed

module.exports = router;


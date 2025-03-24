const express = require('express');
const reminderController = require('../controllers/reminderController');

const router = express.Router();

// POST /api/reminders
router.post('/', reminderController.generateReminders);

module.exports = router;
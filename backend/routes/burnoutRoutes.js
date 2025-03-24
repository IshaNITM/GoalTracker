const express = require('express');
const burnoutController = require('../controllers/burnoutController');

const router = express.Router();

// POST /api/burnout-prompts
router.post('/', burnoutController.generateBurnoutPrompts);

module.exports = router; 
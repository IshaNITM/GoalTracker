const express = require('express');
const goalController = require('../controllers/goalController');

const router = express.Router();

// POST /api/goals
router.post('/', goalController.submitGoal);

module.exports = router;
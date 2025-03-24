
const express = require('express');
const router = express.Router();
const milestoneController = require('../controllers/milestoneController'); // Correct import

// Ensure the correct function is used
router.post('/', milestoneController.generateMilestones);

module.exports = router;
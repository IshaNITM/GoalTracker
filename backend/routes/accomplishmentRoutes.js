const express = require('express');
const accomplishmentController = require('../controllers/accomplishmentController');

const router = express.Router();

// POST /api/accomplishments
router.post('/', accomplishmentController.generateAccomplishments);

module.exports = router;
const express = require('express');
const { generateBurnoutPrompts } = require('../controllers/burnoutController');

const router = express.Router();

router.post('/', generateBurnoutPrompts);

module.exports = router;
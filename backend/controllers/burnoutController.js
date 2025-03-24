const express = require('express');
const cors = require('cors');
const milestoneRoutes = require('../routes/milestoneRoutes');
const reminderRoutes = require('../routes/reminderRoutes');
const accomplishmentRoutes = require('../routes/accomplishmentRoutes');
const burnoutRoutes = require('../routes/burnoutRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/milestones', milestoneRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/accomplishments', accomplishmentRoutes);
app.use('/api/burnout-prompts', burnoutRoutes);

module.exports = app;
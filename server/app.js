const express = require('express');
const cors = require('cors');
const examRoutes = require('./routes/exams');
const studentRoutes = require('./routes/students');
const markRoutes = require('./routes/marks');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/exams', examRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/marks', markRoutes);

module.exports = app;


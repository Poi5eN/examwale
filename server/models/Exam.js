const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  examType: { type: String, required: true },
  className: { type: String, required: true },
  section: { type: String, required: true },
  subjects: [{
    name: { type: String, required: true },
    examDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    totalMarks: { type: Number, required: true },
    passingMarks: { type: Number, required: true }
  }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  resultPublishDate: { type: Date, required: true },
  gradeSystem: { type: String, required: true }
});

module.exports = mongoose.model('Exam', ExamSchema);


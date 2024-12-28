const mongoose = require('mongoose');

const MarkSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  marks: [{
    subjectId: { type: String, required: true },
    subjectName: { type: String, required: true },
    marks: [{
      examType: { type: String, required: true },
      marks: { type: Number, required: true },
      outOf: { type: Number, required: true }
    }]
  }],
  coScholasticMarks: [{
    activityName: { type: String, required: true },
    grade: { type: String, required: true },
    examType: { type: String, required: true }
  }]
});

module.exports = mongoose.model('Mark', MarkSchema);


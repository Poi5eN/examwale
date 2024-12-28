const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  class: { type: String, required: true },
  section: { type: String, required: true },
  motherName: { type: String },
  fatherName: { type: String },
  dateOfBirth: { type: Date },
  admissionNo: { type: String, required: true }
});

module.exports = mongoose.model('Student', StudentSchema);


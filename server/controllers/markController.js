const Mark = require('../models/Mark');

exports.addMark = async (req, res) => {
  try {
    const { studentId, marks, coScholasticMarks } = req.body;
    let studentMark = await Mark.findOne({ studentId });

    if (studentMark) {
      // Update existing marks
      marks.forEach(newSubjectMark => {
        const existingSubjectIndex = studentMark.marks.findIndex(m => m.subjectId === newSubjectMark.subjectId);
        if (existingSubjectIndex !== -1) {
          // If the subject already exists, add the new mark
          studentMark.marks[existingSubjectIndex].marks.push(...newSubjectMark.marks);
        } else {
          // If it's a new subject, add it to the marks array
          studentMark.marks.push(newSubjectMark);
        }
      });

      // Update co-scholastic marks if provided
      if (coScholasticMarks && coScholasticMarks.length > 0) {
        studentMark.coScholasticMarks.push(...coScholasticMarks);
      }
    } else {
      // Create new student mark
      studentMark = new Mark({ 
        studentId, 
        marks, 
        coScholasticMarks: coScholasticMarks || [] 
      });
    }

    await studentMark.save();
    res.status(201).json(studentMark);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMarks = async (req, res) => {
  try {
    const { studentId } = req.query;
    if (studentId) {
      const marks = await Mark.findOne({ studentId });
      res.status(200).json(marks);
    } else {
      const allMarks = await Mark.find();
      res.status(200).json(allMarks);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add other mark-related controller functions as needed


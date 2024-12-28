import React, { useState, useEffect } from 'react';
import { getExams, getStudents, addMark } from '../api';

const AllotMarks = () => {
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [marks, setMarks] = useState({});
  const [coScholasticMarks, setCoScholasticMarks] = useState([]);

  useEffect(() => {
    fetchExams();
    fetchStudents();
  }, []);

  const fetchExams = async () => {
    try {
      const data = await getExams();
      setExams(data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleMarkChange = (subjectId, value) => {
    setMarks({ ...marks, [subjectId]: parseInt(value) });
  };

  const handleCoScholasticMarkChange = (index, field, value) => {
    const updatedMarks = [...coScholasticMarks];
    if (!updatedMarks[index]) {
      updatedMarks[index] = { activityName: ['Work Education', 'Art Education', 'Health & Physical Education'][index] };
    }
    updatedMarks[index] = { ...updatedMarks[index], [field]: value };
    setCoScholasticMarks(updatedMarks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const exam = exams.find(e => e._id === selectedExam);
      if (!exam) throw new Error('Exam not found');

      const studentMark = {
        studentId: selectedStudent,
        marks: Object.entries(marks).map(([subjectId, mark]) => ({
          subjectId,
          subjectName: exam.subjects.find(s => s._id === subjectId)?.name || '',
          marks: [{
            examType: exam.examType,
            marks: mark,
            outOf: exam.subjects.find(s => s._id === subjectId)?.totalMarks || 0
          }]
        })),
        coScholasticMarks: coScholasticMarks.filter(mark => mark && mark.grade).map(mark => ({
          ...mark,
          examType: exam.examType
        }))
      };

      await addMark(studentMark);
      alert('Marks allotted successfully!');
      setMarks({});
      setCoScholasticMarks([]);
    } catch (error) {
      console.error('Error allotting marks:', error);
      alert('Failed to allot marks. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Allot Marks</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Select Exam</label>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          >
            <option value="">Select an exam</option>
            {exams.map(exam => (
              <option key={exam._id} value={exam._id}>{exam.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Select Student</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          >
            <option value="">Select a student</option>
            {students.map(student => (
              <option key={student._id} value={student._id}>{student.name} - Roll No: {student.rollNo}</option>
            ))}
          </select>
        </div>
        {selectedExam && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Enter Marks</h2>
            {exams.find(e => e._id === selectedExam)?.subjects.map(subject => (
              <div key={subject._id} className="mb-2">
                <label className="block mb-1">{subject.name} (Max: {subject.totalMarks})</label>
                <input
                  type="number"
                  value={marks[subject._id] || ''}
                  onChange={(e) => handleMarkChange(subject._id, e.target.value)}
                  min="0"
                  max={subject.totalMarks}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </div>
            ))}
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold mb-2">Co-Scholastic Areas</h2>
          {['Work Education', 'Art Education', 'Health & Physical Education'].map((activity, index) => (
            <div key={index} className="mb-2">
              <label className="block mb-1">{activity}</label>
              <select
                value={coScholasticMarks[index]?.grade || ''}
                onChange={(e) => handleCoScholasticMarkChange(index, 'grade', e.target.value)}
                className="w-full border rounded px-2 py-1"
                required
              >
                <option value="">Select Grade</option>
                {['A+', 'A', 'B+', 'B', 'C+', 'C'].map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Allot Marks
        </button>
      </form>
    </div>
  );
};

export default AllotMarks;


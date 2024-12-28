import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createExam } from '../api';

const CreateExam = () => {
  const navigate = useNavigate();
  const [examData, setExamData] = useState({
    name: '',
    examType: '',
    className: '',
    section: '',
    subjects: [],
    startDate: '',
    endDate: '',
    resultPublishDate: '',
    gradeSystem: ''
  });
  const [newSubject, setNewSubject] = useState({
    name: '',
    examDate: '',
    startTime: '',
    endTime: '',
    totalMarks: 0,
    passingMarks: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExamData({ ...examData, [name]: value });
  };

  const handleSubjectChange = (e) => {
    const { name, value } = e.target;
    setNewSubject({ ...newSubject, [name]: value });
  };

  const addSubject = () => {
    setExamData({
      ...examData,
      subjects: [...examData.subjects, { ...newSubject, id: Date.now().toString() }]
    });
    setNewSubject({
      name: '',
      examDate: '',
      startTime: '',
      endTime: '',
      totalMarks: 0,
      passingMarks: 0
    });
  };

  const removeSubject = (index) => {
    const updatedSubjects = examData.subjects.filter((_, i) => i !== index);
    setExamData({ ...examData, subjects: updatedSubjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createExam(examData);
      alert('Exam created successfully!');
      navigate('/exams');
    } catch (error) {
      console.error('Error creating exam:', error);
      alert('Failed to create exam. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create Exam</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Exam Name</label>
          <input
            type="text"
            name="name"
            value={examData.name}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Exam Type</label>
          <select
            name="examType"
            value={examData.examType}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
            required
          >
            <option value="">Select Exam Type</option>
            <option value="TERM">Term</option>
            <option value="UNIT_TEST">Unit Test</option>
            <option value="FINAL">Final</option>
            <option value="ENTRANCE">Entrance</option>
            <option value="COMPETITIVE">Competitive</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Class</label>
          <input
            type="text"
            name="className"
            value={examData.className}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Section</label>
          <input
            type="text"
            name="section"
            value={examData.section}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={examData.startDate}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            value={examData.endDate}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Result Publish Date</label>
          <input
            type="date"
            name="resultPublishDate"
            value={examData.resultPublishDate}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Grade System</label>
          <select
            name="gradeSystem"
            value={examData.gradeSystem}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
            required
          >
            <option value="">Select Grade System</option>
            <option value="PERCENTAGE">Percentage</option>
            <option value="GRADE">Grade</option>
            <option value="CGPA">CGPA</option>
          </select>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Subjects</h3>
          {examData.subjects.map((subject, index) => (
            <div key={subject.id} className="flex items-center justify-between p-2 border rounded mt-2">
              <span>{subject.name} - {subject.examDate} ({subject.startTime} - {subject.endTime})</span>
              <button type="button" onClick={() => removeSubject(index)} className="bg-red-500 text-white px-2 py-1 rounded">
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 space-y-2">
            <input
              type="text"
              name="name"
              value={newSubject.name}
              onChange={handleSubjectChange}
              placeholder="Subject Name"
              className="w-full border rounded px-2 py-1"
            />
            <input
              type="date"
              name="examDate"
              value={newSubject.examDate}
              onChange={handleSubjectChange}
              className="w-full border rounded px-2 py-1"
            />
            <input
              type="time"
              name="startTime"
              value={newSubject.startTime}
              onChange={handleSubjectChange}
              className="w-full border rounded px-2 py-1"
            />
            <input
              type="time"
              name="endTime"
              value={newSubject.endTime}
              onChange={handleSubjectChange}
              className="w-full border rounded px-2 py-1"
            />
            <input
              type="number"
              name="totalMarks"
              value={newSubject.totalMarks}
              onChange={handleSubjectChange}
              placeholder="Total Marks"
              className="w-full border rounded px-2 py-1"
            />
            <input
              type="number"
              name="passingMarks"
              value={newSubject.passingMarks}
              onChange={handleSubjectChange}
              placeholder="Passing Marks"
              className="w-full border rounded px-2 py-1"
            />
            <button type="button" onClick={addSubject} className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Subject
            </button>
          </div>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Create Exam
        </button>
      </form>
    </div>
  );
};

export default CreateExam;


import React, { useState, useEffect } from 'react';
import { getExams } from '../api';

const Exams = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const data = await getExams();
      setExams(data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Exams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exams.map(exam => (
          <div key={exam._id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{exam.name}</h2>
            <p><strong>Type:</strong> {exam.examType}</p>
            <p><strong>Class:</strong> {exam.className}</p>
            <p><strong>Section:</strong> {exam.section}</p>
            <p><strong>Start Date:</strong> {new Date(exam.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(exam.endDate).toLocaleDateString()}</p>
            <p><strong>Result Publish Date:</strong> {new Date(exam.resultPublishDate).toLocaleDateString()}</p>
            <p><strong>Grade System:</strong> {exam.gradeSystem}</p>
            <h3 className="text-lg font-semibold mt-4 mb-2">Subjects:</h3>
            <ul className="list-disc pl-5">
              {exam.subjects.map(subject => (
                <li key={subject._id}>
                  {subject.name} - {subject.totalMarks} marks
                  <br />
                  Date: {new Date(subject.examDate).toLocaleDateString()}
                  <br />
                  Time: {subject.startTime} - {subject.endTime}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exams;


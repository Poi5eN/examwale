import React, { useState, useEffect } from 'react';
import { getExams, getStudents, getMarks } from '../api';
import ReportCard from '../components/ReportCard';

const GenerateReport = () => {
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedExams, setSelectedExams] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [reportData, setReportData] = useState([]);

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

  const handleExamSelection = (examId) => {
    setSelectedExams(prev => 
      prev.includes(examId)
        ? prev.filter(id => id !== examId)
        : [...prev, examId]
    );
  };

  const handleStudentSelection = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedExamData = exams.filter(exam => selectedExams.includes(exam._id));
      const selectedStudentData = students.filter(student => selectedStudents.includes(student._id));

      const allMarks = await getMarks();

      const reports = selectedStudentData.map((student) => {
        const studentMarks = allMarks.find(sm => sm.studentId === student._id);
        if (!studentMarks) return null;

        const subjectsWithMarks = processSubjectMarks(studentMarks, selectedExamData);
        const coScholasticMarks = processCoScholasticMarks(studentMarks, selectedExamData);
        const { totalMarks, totalOutOf, percentage, overallGrade } = calculateOverallMarks(subjectsWithMarks);

        return {
          student,
          subjects: subjectsWithMarks,
          totalMarks,
          totalOutOf,
          percentage,
          overallGrade,
          examTypes: selectedExamData.map(exam => exam.examType),
          coScholasticMarks
        };
      }).filter(report => report !== null);

      setReportData(reports);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    }
  };

  const processSubjectMarks = (studentMarks, selectedExams) => {
    const allSubjects = new Set();
    selectedExams.forEach(exam => {
      exam.subjects.forEach(subject => allSubjects.add(subject.name));
    });

    return Array.from(allSubjects).map(subjectName => {
      const subjectMarks = studentMarks.marks.filter(mark => mark.subjectName === subjectName);
      const examTypeMarks = selectedExams.map(exam => {
        const mark = subjectMarks.find(m => m.marks.some(em => em.examType === exam.examType));
        const examMark = mark ? mark.marks.find(m => m.examType === exam.examType) : null;
        return {
          examType: exam.examType,
          marks: examMark ? examMark.marks : '-',
          outOf: examMark ? examMark.outOf : '-'
        };
      });

      const totalMarks = subjectMarks.reduce((sum, mark) => sum + mark.marks.reduce((s, m) => s + m.marks, 0), 0);
      const totalOutOf = subjectMarks.reduce((sum, mark) => sum + mark.marks.reduce((s, m) => s + m.outOf, 0), 0);
      const percentage = totalOutOf > 0 ? (totalMarks / totalOutOf) * 100 : 0;

      return {
        name: subjectName,
        examTypeMarks,
        totalMarks,
        totalOutOf,
        percentage,
        grade: calculateGrade(percentage)
      };
    });
  };

  const processCoScholasticMarks = (studentMarks, selectedExams) => {
    return (studentMarks.coScholasticMarks || []).filter(mark => 
      selectedExams.some(exam => exam.examType === mark.examType)
    );
  };

  const calculateOverallMarks = (subjectsWithMarks) => {
    const totalMarks = subjectsWithMarks.reduce((sum, subject) => sum + subject.totalMarks, 0);
    const totalOutOf = subjectsWithMarks.reduce((sum, subject) => sum + subject.totalOutOf, 0);
    const percentage = totalOutOf > 0 ? (totalMarks / totalOutOf) * 100 : 0;
    return {
      totalMarks,
      totalOutOf,
      percentage,
      overallGrade: calculateGrade(percentage)
    };
  };

  const calculateGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C+';
    if (percentage >= 40) return 'C';
    return 'F';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Generate Report Card</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Select Exams</h2>
          {exams.map(exam => (
            <label key={exam._id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedExams.includes(exam._id)}
                onChange={() => handleExamSelection(exam._id)}
              />
              <span>{exam.name}</span>
            </label>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Select Students</h2>
          {students.map(student => (
            <label key={student._id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedStudents.includes(student._id)}
                onChange={() => handleStudentSelection(student._id)}
              />
              <span>{student.name} - Roll No: {student.rollNo}</span>
            </label>
          ))}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Generate Report
        </button>
      </form>
      <div className="mt-8">
        {reportData.map((data, index) => (
          <ReportCard key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default GenerateReport;


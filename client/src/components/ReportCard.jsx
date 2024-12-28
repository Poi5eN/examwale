import React from 'react';

const ReportCard = ({ data }) => {
  const { student, subjects, totalMarks, totalOutOf, percentage, overallGrade, examTypes, coScholasticMarks } = data;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-8 max-w-4xl mx-auto">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">R.K.S.V.M. INTER COLLEGE</h2>
        <p>Makanpur Road, Nyay Khand-1st Indirapuram Gzb</p>
        <p>09090900621</p>
        <h3 className="text-xl font-semibold mt-2">PROGRESS REPORT 2023-24</h3>
        <p>SCHOOL AFFILIATION NO G.J.H-576</p>
        <p>U-DISE CODE 9100108110</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p><strong>Student's Name:</strong> {student.name}</p>
          <p><strong>Mother's Name:</strong> {student.motherName}</p>
          <p><strong>Father's Name:</strong> {student.fatherName}</p>
          <p><strong>Date of Birth:</strong> {student.dateOfBirth}</p>
        </div>
        <div>
          <p><strong>Class:</strong> {student.class} {student.section}</p>
          <p><strong>Roll No.:</strong> {student.rollNo}</p>
          <p><strong>Admission No.:</strong> {student.admissionNo}</p>
        </div>
      </div>
      <table className="w-full mb-4 text-sm border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">SUBJECTS</th>
            {examTypes.map(examType => (
              <th key={examType} className="border border-gray-300 p-2">{examType}</th>
            ))}
            <th className="border border-gray-300 p-2">TOTAL</th>
            <th className="border border-gray-300 p-2">%</th>
            <th className="border border-gray-300 p-2">GRADE</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="border border-gray-300 p-2">{subject.name}</td>
              {subject.examTypeMarks.map((mark, i) => (
                <td key={i} className="border border-gray-300 p-2 text-center">
                  {mark.marks !== '-' ? `${mark.marks}/${mark.outOf}` : '-'}
                </td>
              ))}
              <td className="border border-gray-300 p-2 text-center">{subject.totalMarks}/{subject.totalOutOf}</td>
              <td className="border border-gray-300 p-2 text-center">{subject.percentage.toFixed(2)}%</td>
              <td className="border border-gray-300 p-2 text-center">{subject.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-4 text-sm">
        <p><strong>Total Marks:</strong> {totalMarks} / {totalOutOf}</p>
        <p><strong>Percentage:</strong> {percentage.toFixed(2)}%</p>
        <p><strong>Overall Grade:</strong> {overallGrade}</p>
      </div>
      <div className="mb-4 text-sm">
        <h4 className="font-semibold mb-1">Co-Scholastic Areas</h4>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Activity</th>
              <th className="border border-gray-300 p-2">Grade</th>
              <th className="border border-gray-300 p-2">Exam Type</th>
            </tr>
          </thead>
          <tbody>
            {coScholasticMarks.map((mark, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{mark.activityName}</td>
                <td className="border border-gray-300 p-2 text-center">{mark.grade}</td>
                <td className="border border-gray-300 p-2 text-center">{mark.examType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-sm">
        <h4 className="font-semibold mb-1">Discipline</h4>
        <p>Grade: A</p>
      </div>
      <div className="mt-4 text-sm">
        <h4 className="font-semibold mb-1">Teacher's Remarks</h4>
        <p>Excellent performance. Keep up the good work!</p>
      </div>
      <div className="mt-6 flex justify-between text-sm">
        <div>Class Teacher's Signature</div>
        <div>Principal's Signature</div>
      </div>
    </div>
  );
};

export default ReportCard;


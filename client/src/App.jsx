import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateExam from './pages/CreateExam';
import Exams from './pages/Exams';
import AllotMarks from './pages/AllotMarks';
import GenerateReport from './pages/GenerateReport';
import ManageClasses from './pages/ManageClasses';
import ManageStudents from './pages/ManageStudents';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4">
          <ul className="flex space-x-4">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create-exam">Create Exam</Link></li>
            <li><Link to="/exams">View Exams</Link></li>
            <li><Link to="/allot-marks">Allot Marks</Link></li>
            <li><Link to="/generate-report">Generate Report</Link></li>
            <li><Link to="/manage-classes">Manage Classes</Link></li>
            <li><Link to="/manage-students">Manage Students</Link></li>
          </ul>
        </nav>

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<h1 className="text-3xl font-bold">Welcome to School Exam System</h1>} />
            <Route path="/create-exam" element={<CreateExam />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/allot-marks" element={<AllotMarks />} />
            <Route path="/generate-report" element={<GenerateReport />} />
            <Route path="/manage-classes" element={<ManageClasses />} />
            <Route path="/manage-students" element={<ManageStudents />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;


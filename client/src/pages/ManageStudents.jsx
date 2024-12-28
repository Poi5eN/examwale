import React, { useState, useEffect } from 'react';
import { getStudents, createStudent, deleteStudent } from '../api';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNo: '',
    class: '',
    section: '',
    motherName: '',
    fatherName: '',
    dateOfBirth: '',
    admissionNo: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const addStudent = async () => {
    try {
      const createdStudent = await createStudent(newStudent);
      setStudents([...students, createdStudent]);
      setNewStudent({
        name: '',
        rollNo: '',
        class: '',
        section: '',
        motherName: '',
        fatherName: '',
        dateOfBirth: '',
        admissionNo: ''
      });
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student. Please try again.');
    }
  };

  const removeStudent = async (id) => {
    try {
      await deleteStudent(id);
      setStudents(students.filter(student => student._id !== id));
    } catch (error) {
      console.error('Error removing student:', error);
      alert('Failed to remove student. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Students</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Student</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newStudent.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            name="rollNo"
            value={newStudent.rollNo}
            onChange={handleInputChange}
            placeholder="Roll No"
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            name="class"
            value={newStudent.class}
            onChange={handleInputChange}
            placeholder="Class"
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            name="section"
            value={newStudent.section}
            onChange={handleInputChange}
            placeholder="Section"
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            name="motherName"
            value={newStudent.motherName}
            onChange={handleInputChange}
            placeholder="Mother's Name"
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            name="fatherName"
            value={newStudent.fatherName}
            onChange={handleInputChange}
            placeholder="Father's Name"
            className="border rounded px-2 py-1"
          />
          <input
            type="date"
            name="dateOfBirth"
            value={newStudent.dateOfBirth}
            onChange={handleInputChange}
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            name="admissionNo"
            value={newStudent.admissionNo}
            onChange={handleInputChange}
            placeholder="Admission No"
            className="border rounded px-2 py-1"
          />
        </div>
        <button onClick={addStudent} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add Student</button>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Student List</h2>
        <div className="space-y-4">
          {students.map(student => (
            <div key={student._id} className="flex justify-between items-center p-4 border rounded">
              <div>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Roll No:</strong> {student.rollNo}</p>
                <p><strong>Class:</strong> {student.class} {student.section}</p>
              </div>
              <button onClick={() => removeStudent(student._id)} className="bg-red-500 text-white px-4 py-2 rounded">Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageStudents;


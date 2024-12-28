import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createExam = async (examData) => {
  const response = await axios.post(`${API_URL}/exams`, examData);
  return response.data;
};

export const getExams = async () => {
  const response = await axios.get(`${API_URL}/exams`);
  return response.data;
};

export const getStudents = async () => {
  const response = await axios.get(`${API_URL}/students`);
  return response.data;
};

export const createStudent = async (studentData) => {
  const response = await axios.post(`${API_URL}/students`, studentData);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await axios.delete(`${API_URL}/students/${id}`);
  return response.data;
};

export const addMark = async (markData) => {
  const response = await axios.post(`${API_URL}/marks`, markData);
  return response.data;
};

export const getMarks = async (studentId) => {
  const response = await axios.get(`${API_URL}/marks`, { params: { studentId } });
  return response.data;
};


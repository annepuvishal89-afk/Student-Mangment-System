// User APIs
export const getUsers = () => api.get('/users');
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const getCurrentUser = () => api.get('/auth/me');

// Student APIs
export const getStudents = (params) => api.get('/students', { params });
export const getStudentById = (id) => api.get(`/students/${id}`);
export const createStudent = (studentData) => api.post('/students', studentData);
export const updateStudent = (id, studentData) => api.put(`/students/${id}`, studentData);
export const deleteStudent = (id) => api.delete(`/students/${id}`);
export const searchStudents = (query) => api.get(`/students/search/${query}`);

// Course APIs
export const getCourses = () => api.get('/courses');
export const createCourse = (courseData) => api.post('/courses', courseData);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);
export const enrollStudent = (courseId, studentId) => 
  api.post(`/courses/${courseId}/enroll`, { studentId });

// Grade APIs
export const getGrades = (studentId) =>
  studentId ? api.get(`/grades/student/${studentId}`) : api.get('/grades');
export const submitGrade = (gradeData) => api.post('/grades', gradeData);
export const deleteGrade = (id) => api.delete(`/grades/${id}`);

export default api;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Profile from './pages/Profile';
import Grades from './pages/Grades';
import RequireAuth from './components/Auth/RequireAuth';
import './styles/main.css';

const queryClient = new QueryClient();


import { login as loginApi, register as registerApi } from './services/api';
import toast from 'react-hot-toast';

function AppRoutes() {
  const { login } = useAuth();

  // Handles login form submission
  const handleLogin = async (data) => {
    try {
      const res = await loginApi(data);
      login(res.data.user, res.data.token);
      toast.success('Login successful!');
      window.location.href = '/dashboard';
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  // Handles registration form submission
  const handleRegister = async (data) => {
    try {
      const res = await registerApi(data);
      toast.success('Registration successful! Please log in.');
      window.location.href = '/login';
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  const { user } = useAuth();
  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/dashboard" replace /> : <Register onRegister={handleRegister} />}
      />
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="courses" element={<Courses />} />
          <Route path="profile" element={<Profile />} />
          <Route path="grades" element={<Grades />} />
        </Route>
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
            <AppRoutes />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

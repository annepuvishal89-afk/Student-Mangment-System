import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RequireAuth = () => {
  const { user, loading } = useAuth();
  if (loading) return null; // or a loading spinner
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;

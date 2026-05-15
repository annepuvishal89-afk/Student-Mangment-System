import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <header className="bg-white shadow px-4 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-gray-900">Student Management System</h1>
      {user && (
        <button
          onClick={logout}
          className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Login = ({ onLogin }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    setLoading(true);
    await onLogin(data);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-md mx-auto mt-16 bg-white p-8 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" {...register('email', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" {...register('password', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
      <button type="submit" disabled={loading} className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <div className="text-center mt-4">
        <span className="text-sm text-gray-600">New user? </span>
        <a href="/register" className="text-indigo-600 hover:underline">Register here</a>
      </div>
    </form>
  );
};

export default Login;

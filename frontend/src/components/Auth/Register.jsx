import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DEPARTMENTS } from '../../utils/constants';

const Register = ({ onRegister }) => {
  const { register, handleSubmit, watch } = useForm();
  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    setLoading(true);
    await onRegister(data);
    setLoading(false);
  };

  const role = watch('role');
  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-md mx-auto mt-16 bg-white p-8 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" {...register('email', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" {...register('password', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select {...register('role', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      {role === 'student' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Student ID</label>
            <input type="text" {...register('studentData.studentId', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" {...register('studentData.firstName', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" {...register('studentData.lastName', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="text" {...register('studentData.phone', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input type="date" {...register('studentData.dateOfBirth', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select {...register('studentData.department', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
              <option value="">Select department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
              <option value="Arts">Arts</option>
              <option value="Science">Science</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Semester</label>
            <input type="text" {...register('studentData.semester', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Street</label>
            <input type="text" {...register('studentData.address.street', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input type="text" {...register('studentData.address.city', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input type="text" {...register('studentData.address.state', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Zip Code</label>
            <input type="text" {...register('studentData.address.zipCode', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input type="text" {...register('studentData.address.country', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Enrollment Date</label>
            <input type="date" {...register('studentData.enrollmentDate', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
        </>
      )}
      <button type="submit" disabled={loading} className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default Register;

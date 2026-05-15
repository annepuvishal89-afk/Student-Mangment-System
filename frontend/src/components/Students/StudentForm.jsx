import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DEPARTMENTS, STATUSES } from '../../utils/constants';

const StudentForm = ({ student, onSubmit, isLoading }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: student || {},
  });

  useEffect(() => {
    reset(student || {});
  }, [student, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input {...register('firstName', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input {...register('lastName', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" {...register('email', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input {...register('phone', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input type="date" {...register('dateOfBirth', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Department</label>
        <select {...register('department', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
          <option value="">Select</option>
          {DEPARTMENTS.map(dep => <option key={dep} value={dep}>{dep}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Semester</label>
        <input type="number" min="1" max="8" {...register('semester', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select {...register('status', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
          {STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
        </select>
      </div>
      <button type="submit" disabled={isLoading} className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
        {isLoading ? 'Saving...' : student ? 'Update Student' : 'Add Student'}
      </button>
    </form>
  );
};

export default StudentForm;

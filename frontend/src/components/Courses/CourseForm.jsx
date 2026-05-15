import React, { useState } from 'react';
import { DEPARTMENTS } from '../../utils/constants';

const CourseForm = ({ onSubmit, isLoading }) => {
  const [form, setForm] = useState({
    courseCode: '',
    courseName: '',
    description: '',
    credits: 3,
    department: '',
    semester: 1
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit({
      courseCode: form.courseCode,
      courseName: form.courseName,
      description: form.description,
      credits: form.credits,
      department: form.department,
      semester: form.semester
    }); }} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Course Code</label>
        <input name="courseCode" value={form.courseCode} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Course Name</label>
        <input name="courseName" value={form.courseName} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Credits</label>
        <input type="number" name="credits" min="1" max="5" value={form.credits} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Department</label>
        <select name="department" value={form.department} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
          <option value="">Select</option>
          {DEPARTMENTS.map(dep => <option key={dep} value={dep}>{dep}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Semester</label>
        <input type="number" name="semester" min="1" max="8" value={form.semester} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
      <button type="submit" disabled={isLoading} className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
        {isLoading ? 'Saving...' : 'Add Course'}
      </button>
    </form>
  );
};

export default CourseForm;


import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getGrades, submitGrade, getCourses, getStudents, deleteGrade } from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Grades = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteGrade, {
    onSuccess: () => {
      queryClient.invalidateQueries(user?.role === 'admin' ? 'grades-all' : ['grades', user?.student?._id]);
      toast.success('Grade deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete grade');
    }
  });

  const handleDeleteGrade = (id) => {
    if (window.confirm('Are you sure you want to delete this grade?')) {
      deleteMutation.mutate(id);
    }
  };
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ student: '', course: '', marks: '', grade: '', remarks: '' });

  const { data: grades = [], isLoading } = useQuery(
    user?.role === 'admin'
      ? 'grades-all'
      : ['grades', user?.student?._id],
    () =>
      user?.role === 'admin'
        ? getGrades().then(res => res.data)
        : getGrades(user?.student?._id).then(res => res.data),
    { enabled: user?.role === 'admin' || !!user?.student?._id }
  );
  // Fetch students for admin dropdown
  const { data: students = [] } = useQuery('students', () => getStudents().then(res => res.data));
  const { data: courses = [] } = useQuery('courses', () => getCourses().then(res => res.data));

  const mutation = useMutation(submitGrade, {
    onSuccess: () => {
      queryClient.invalidateQueries(['grades', user?.student?._id]);
      setShowForm(false);
      setForm({ course: '', marks: '', grade: '', remarks: '' });
      toast.success('Grade submitted successfully!');
    },
    onError: (error) => {
      let message = 'Failed to submit grade';
      if (error.response?.status === 401) {
        message = 'Unauthorized: Please log in as admin.';
      } else if (error.response?.status === 403) {
        message = 'Forbidden: You do not have permission to submit grades.';
      } else if (error.response?.data?.errors) {
        message = error.response.data.errors.map(e => e.msg).join(', ');
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.response?.data) {
        message = JSON.stringify(error.response.data);
      } else if (error.message) {
        message = error.message;
      }
      toast.error(`Failed to submit grade: ${message}`);
    }
  });

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // If user is a student, auto-fill their own ID
    if (user?.role === 'student' && user?.student?._id) {
      mutation.mutate({ ...form, student: user.student._id });
    } else {
      mutation.mutate(form);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Grades</h2>
        <button
          onClick={() => setShowForm(f => !f)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {showForm ? 'Hide Form' : 'Submit Grade'}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow space-y-4">
          {/* Student dropdown for admin users */}
          {user?.role === 'admin' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Student</label>
              <select name="student" value={form.student} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                <option value="">Select</option>
                {students.map(s => <option key={s._id} value={s._id}>{s.firstName} {s.lastName}</option>)}
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Course</label>
            <select name="course" value={form.course} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
              <option value="">Select</option>
              {courses.map(c => <option key={c._id} value={c._id}>{c.courseName}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Marks</label>
            <input name="marks" type="number" value={form.marks} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Grade</label>
            <input name="grade" value={form.grade} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Remarks</label>
            <input name="remarks" value={form.remarks} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <button type="submit" disabled={mutation.isLoading} className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700">
            {mutation.isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2">Course</th>
              <th className="px-4 py-2">Marks</th>
              <th className="px-4 py-2">Grade</th>
              <th className="px-4 py-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="text-center py-4">Loading...</td></tr>
            ) : grades.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-4">No grades found.</td></tr>
            ) : (
              grades.map(g => (
                <tr key={g._id} className="border-t">
                  <td className="px-4 py-2">{g.course?.courseName || 'N/A'}</td>
                  <td className="px-4 py-2">{g.marks}</td>
                  <td className="px-4 py-2">{g.grade}</td>
                  <td className="px-4 py-2">{g.remarks}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteGrade(g._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Grade"
                    >
                      &#10006;
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Grades;

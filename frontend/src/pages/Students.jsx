import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../services/api';
import StudentList from '../components/Students/StudentList';
import StudentForm from '../components/Students/StudentForm';
import Modal from '../components/Common/Modal';
import toast from 'react-hot-toast';

const Students = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: students = [], isLoading } = useQuery('students', () => getStudents().then(res => res.data));

  const createMutation = useMutation(createStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries('students');
      setIsModalOpen(false);
      setEditingStudent(null);
      toast.success('Student added successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add student');
    }
  });

  const updateMutation = useMutation(({ id, data }) => updateStudent(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('students');
      setIsModalOpen(false);
      setEditingStudent(null);
      toast.success('Student updated successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update student');
    }
  });

  const deleteMutation = useMutation(deleteStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries('students');
      toast.success('Student deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete student');
    }
  });

  const handleAdd = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (data) => {
    if (editingStudent) {
      updateMutation.mutate({ id: editingStudent._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const filteredStudents = students.filter(s =>
    (s.firstName + ' ' + s.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Students</h2>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          + Add Student
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="block w-full max-w-xs pl-3 pr-3 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <StudentList students={filteredStudents} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingStudent(null); }} title={editingStudent ? 'Edit Student' : 'Add Student'}>
        <StudentForm student={editingStudent} onSubmit={handleSubmit} isLoading={createMutation.isLoading || updateMutation.isLoading} />
      </Modal>
    </div>
  );
};

export default Students;

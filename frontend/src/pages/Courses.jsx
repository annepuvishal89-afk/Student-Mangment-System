
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import CourseList from '../components/Courses/CourseList';
import CourseForm from '../components/Courses/CourseForm';
import Modal from '../components/Common/Modal';
import { getCourses, createCourse, deleteCourse } from '../services/api';
import toast from 'react-hot-toast';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Courses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: courses = [], isLoading } = useQuery('courses', () => getCourses().then(res => res.data));


  const createMutation = useMutation(createCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries('courses');
      setIsModalOpen(false);
      toast.success('Course added successfully!');
    },
    onError: (error) => {
      let message = 'Failed to add course';
      if (error.response?.status === 401) {
        message = 'Unauthorized: Please log in as admin.';
      } else if (error.response?.status === 403) {
        message = 'Forbidden: You do not have permission to add courses.';
      } else if (error.response?.data?.errors) {
        message = error.response.data.errors.map(e => e.msg).join(', ');
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.response?.data) {
        message = JSON.stringify(error.response.data);
      } else if (error.message) {
        message = error.message;
      }
      toast.error(`Failed to add course: ${message}`);
    }
  });

  const handleAddCourse = (data) => {
    createMutation.mutate(data);
  };


  const deleteMutation = useMutation(deleteCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries('courses');
      toast.success('Course deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete course');
    }
  });

  const handleDeleteCourse = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteMutation.mutate(id);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Courses</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" /> Add Course
        </button>
      </div>
      <div className="mb-4 flex items-center">
        <div className="relative w-full max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CourseList courses={filteredCourses} onDelete={handleDeleteCourse} />
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Course">
        <CourseForm onSubmit={handleAddCourse} isLoading={createMutation.isLoading} />
      </Modal>
    </div>
  );
};

export default Courses;

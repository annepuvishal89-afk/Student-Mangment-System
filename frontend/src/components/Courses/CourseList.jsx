import React, { useState } from 'react';

const PAGE_SIZE = 6;

const CourseList = ({ courses, onDelete }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(courses.length / PAGE_SIZE);
  const pagedCourses = courses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pagedCourses.map(course => (
          <div key={course._id} className="bg-white shadow rounded-lg p-4 flex flex-col space-y-2">
            <div className="font-semibold text-lg">{course.courseName}</div>
            <div className="text-sm text-gray-500">{course.courseCode}</div>
            <div className="text-xs text-gray-400">{course.department} | Semester {course.semester}</div>
            <button onClick={() => onDelete(course._id)} className="px-2 py-1 bg-red-500 text-white rounded text-xs mt-2">Delete</button>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button className="btn" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
          <span className="px-2">Page {page} of {totalPages}</span>
          <button className="btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default CourseList;

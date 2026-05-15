
import React, { useState } from 'react';
import StudentCard from './StudentCard';

const PAGE_SIZE = 6;

const StudentList = ({ students, onEdit, onDelete }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(students.length / PAGE_SIZE);
  const pagedStudents = students.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pagedStudents.map(student => (
          <StudentCard key={student._id} student={student} onEdit={onEdit} onDelete={onDelete} />
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

export default StudentList;

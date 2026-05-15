import React from 'react';


const getInitials = (student) => {
  if (!student) return '';
  const fn = student.firstName || '';
  const ln = student.lastName || '';
  return (fn[0] || '') + (ln[0] || '');
};

const StudentCard = ({ student, onEdit, onDelete }) => (
  <div className="bg-white shadow rounded-lg p-4 flex flex-col space-y-2">
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-lg font-bold text-indigo-600">
        {getInitials(student)}
      </div>
      <div>
        <div className="font-semibold text-lg">{student.firstName} {student.lastName}</div>
        <div className="text-sm text-gray-500">{student.email}</div>
      </div>
    </div>
    <div className="text-xs text-gray-400 mt-1">{student.department} | Semester {student.semester}</div>
    <div className="flex space-x-2 mt-2">
      <button onClick={() => onEdit(student)} className="px-2 py-1 bg-indigo-500 text-white rounded text-xs">Edit</button>
      <button onClick={() => onDelete(student._id)} className="px-2 py-1 bg-red-500 text-white rounded text-xs">Delete</button>
    </div>
  </div>
);

export default StudentCard;

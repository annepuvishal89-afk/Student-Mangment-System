

import React from 'react';
import { useQuery } from 'react-query';
import StatsCard from '../components/Dashboard/StatsCard';
import RecentActivity from '../components/Dashboard/RecentActivity';
import { getStudents, getCourses, getUsers } from '../services/api';
import { UserGroupIcon, AcademicCapIcon, UserIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { data: students, isLoading: loadingStudents } = useQuery('students', () => getStudents().then(res => res.data));
  const { data: courses, isLoading: loadingCourses } = useQuery('courses', () => getCourses().then(res => res.data));
  const { data: users, isLoading: loadingUsers } = useQuery('users', () => getUsers().then(res => res.data));

  const admins = users ? users.filter(u => u.role === 'admin').length : 0;

  const stats = [
    { title: 'Total Students', value: students ? students.length : '...', icon: UserGroupIcon, color: 'indigo' },
    { title: 'Courses', value: courses ? courses.length : '...', icon: AcademicCapIcon, color: 'green' },
    { title: 'Active Admins', value: admins, icon: UserIcon, color: 'blue' },
  ];

  const activities = [
    students && students.length ? `Latest student: ${students[students.length-1].firstName} ${students[students.length-1].lastName}` : 'No students yet',
    courses && courses.length ? `Latest course: ${courses[courses.length-1].courseName}` : 'No courses yet',
    'System running smoothly',
  ];

  // Simple analytics chart (students/courses/admins)
  const chartData = [
    { label: 'Students', value: students ? students.length : 0, color: '#6366f1' },
    { label: 'Courses', value: courses ? courses.length : 0, color: '#22c55e' },
    { label: 'Admins', value: admins, color: '#3b82f6' },
  ];

  const maxValue = Math.max(...chartData.map(d => d.value), 1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
        {stats.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>
      {/* Simple bar chart */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Analytics</h3>
        <div className="flex items-end space-x-8 h-32">
          {chartData.map((d, i) => (
            <div key={i} className="flex flex-col items-center w-20">
              <div
                className="rounded-t-md"
                style={{
                  height: `${(d.value / maxValue) * 100}%`,
                  width: '100%',
                  background: d.color,
                  transition: 'height 0.3s',
                }}
              ></div>
              <span className="mt-2 font-medium text-gray-700">{d.value}</span>
              <span className="text-xs text-gray-500">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <RecentActivity activities={activities} />
      </div>
    </div>
  );
};

export default Dashboard;

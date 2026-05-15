import React from 'react';

const RecentActivity = ({ activities }) => (
  <div className="bg-white shadow rounded-lg p-4">
    <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
    <ul className="divide-y divide-gray-200">
      {activities && activities.length > 0 ? (
        activities.map((activity, idx) => (
          <li key={idx} className="py-2 text-sm text-gray-700">{activity}</li>
        ))
      ) : (
        <li className="py-2 text-gray-400">No recent activity</li>
      )}
    </ul>
  </div>
);

export default RecentActivity;

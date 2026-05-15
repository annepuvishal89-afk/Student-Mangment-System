

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(user?.student || {});
  const [profileImage, setProfileImage] = useState(form.profileImage || 'https://ui-avatars.com/api/?name=' + (form.firstName || 'User'));

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setForm(f => ({ ...f, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: Add update profile API call
    setEdit(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Profile</h2>
      <div className="flex flex-col items-center mb-6">
        <img
          src={profileImage}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-indigo-200 shadow mb-2"
        />
        {edit && (
          <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
        )}
      </div>
      {user?.role === 'student' && (
        <>
          {!edit ? (
            <div className="space-y-2 text-lg">
              <div><span className="font-semibold">Name:</span> {form.firstName} {form.lastName}</div>
              <div><span className="font-semibold">Email:</span> {form.email}</div>
              <div><span className="font-semibold">Student ID:</span> {form.studentId}</div>
              <div><span className="font-semibold">Department:</span> {form.department}</div>
              <div><span className="font-semibold">Semester:</span> {form.semester}</div>
              <div><span className="font-semibold">Status:</span> {form.status}</div>
              <div><span className="font-semibold">Date of Birth:</span> {form.dateOfBirth ? new Date(form.dateOfBirth).toLocaleDateString() : ''}</div>
              <div><span className="font-semibold">Phone:</span> {form.phone}</div>
              <div><span className="font-semibold">Address:</span> {form.address?.street}, {form.address?.city}, {form.address?.state}, {form.address?.country}</div>
              <div><span className="font-semibold">Enrollment Date:</span> {form.enrollmentDate ? new Date(form.enrollmentDate).toLocaleDateString() : ''}</div>
              <button onClick={() => setEdit(true)} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Edit Profile</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input name="firstName" value={form.firstName || ''} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input name="lastName" value={form.lastName || ''} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input name="phone" value={form.phone || ''} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <input name="department" value={form.department || ''} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Semester</label>
                  <input name="semester" value={form.semester || ''} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <input name="status" value={form.status || ''} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input name="dateOfBirth" type="date" value={form.dateOfBirth ? form.dateOfBirth.substring(0,10) : ''} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input name="address.street" value={form.address?.street || ''} onChange={e => setForm(f => ({ ...f, address: { ...f.address, street: e.target.value } }))} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Street" />
                  <input name="address.city" value={form.address?.city || ''} onChange={e => setForm(f => ({ ...f, address: { ...f.address, city: e.target.value } }))} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="City" />
                  <input name="address.state" value={form.address?.state || ''} onChange={e => setForm(f => ({ ...f, address: { ...f.address, state: e.target.value } }))} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="State" />
                  <input name="address.country" value={form.address?.country || ''} onChange={e => setForm(f => ({ ...f, address: { ...f.address, country: e.target.value } }))} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Country" />
                </div>
              </div>
              <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700">Save</button>
              <button type="button" onClick={() => setEdit(false)} className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-md mt-2">Cancel</button>
            </form>
          )}
        </>
      )}
      {user?.role === 'admin' && (
        <div className="text-center py-8">
          <img
            src={profileImage}
            alt="Admin"
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200 shadow mb-2 mx-auto"
          />
          <div className="text-lg font-semibold">Admin Email: {user.email}</div>
          <div className="text-gray-500">Role: Admin</div>
          <div className="text-gray-500 mt-2">Last Login: {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}</div>
        </div>
      )}
    </div>
  );
};

export default Profile;

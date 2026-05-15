import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';


const Layout = () => (
  <div className="min-h-screen bg-gray-50">
    <Sidebar />
    <div className="md:ml-64 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  </div>
);

export default Layout;

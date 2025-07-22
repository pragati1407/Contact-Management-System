import React from 'react';
import Navbar from '../src/component/Navbar';
import '../../client/assets/css/dashboard.css';
import { Outlet } from 'react-router-dom';
import Sidebar from '../src/component/Sidebar';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="contact-container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

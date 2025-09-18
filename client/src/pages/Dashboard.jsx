import React from 'react';
import Navbar from '../component/Navbar';
import '../../assets/css/dashboard.css';
import { Outlet } from 'react-router-dom';
import Sidebar from '../component/Sidebar';

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

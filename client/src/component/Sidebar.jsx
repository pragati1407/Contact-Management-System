import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/sidebar.css'; 
import {
  FaCube,
  FaUser,
  FaAddressCard,
  FaRegAddressCard,
  FaPowerOff
} from 'react-icons/fa';

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(0);

  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <FaCube className="top-icon" />
      </div>

      <div
        className={`sidebar-item ${activeLink === 0 ? 'active' : ''}`}
        onClick={() => setActiveLink(0)}
      >
        <Link to="/dashboard/profile" className="sidebar-link">
          <FaUser className="icon" /> Profile
        </Link>
      </div>

      <div
        className={`sidebar-item ${activeLink === 1 ? 'active' : ''}`}
        onClick={() => setActiveLink(1)}
      >
        <Link to="/dashboard" className="sidebar-link">
          <FaAddressCard className="icon" /> Contact
        </Link>
      </div>

      <div
        className={`sidebar-item ${activeLink === 2 ? 'active' : ''}`}
        onClick={() => setActiveLink(2)}
      >
        <Link to="/dashboard/add-contact" className="sidebar-link">
          <FaRegAddressCard className="icon" /> Add Contact
        </Link>
      </div>

      <div
        className={`sidebar-item ${activeLink === 3 ? 'active' : ''}`}
        onClick={() => setActiveLink(3)}
      >
        <Link to="/logout" className="sidebar-link">
          <FaPowerOff className="icon" /> Exit
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

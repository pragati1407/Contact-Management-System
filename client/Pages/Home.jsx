import React from 'react';
import Navbar from '../src/component/Navbar';
import '../assets/css/home.css';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home">
        <h1 className='home-title'>CONTACT MANAGEMENT SYSTEM</h1>
        <p className='home-description'>
          Effortlessly manage, organize, and access all your contacts in one place. Stay connected,
          productive, and in complete control.
        </p>
      </div>
    </>
  );
};

export default Home;

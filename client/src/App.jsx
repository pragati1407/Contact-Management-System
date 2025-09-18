// src/App.jsx

import React, { createContext, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Corrected import paths (all lowercase folders)
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';// 🔥 FIXED PATH
import Dashboard from '../pages/Dashboard';
import Contact from './component/Contact';
import AddContact from './component/AddContact';

// ✅ Context to share user across components (e.g., Dashboard)
export const UserContext = createContext(null);

// ✅ React Router config (nested routes work fine this way)
const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      { index: true, element: <Contact /> },
      { path: 'add-contact', element: <AddContact /> },
    ],
  },
]);

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:3000/contactmsyt/verify', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.user);
          }
        })
        .catch((err) => {
          console.error('User verification failed:', err);
          localStorage.removeItem('token'); // Optional: logout on failure
        });
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

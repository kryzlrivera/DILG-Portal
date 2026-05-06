import { supabase } from './supabase'
import { useEffect } from 'react'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/public/Home';
import About from './pages/public/About';
import AdminDashboard from './pages/admin/AdminDashboard';
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard';
import PersonnelManagement from './pages/admin/PersonnelManagement';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ListOfBarangay from './pages/public/ListOfBarangay';

import './App.css';

function App() {
  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase.from('test').select('*');
        if (error) {
          console.error("Supabase connection error:", error.message);
        } else {
          console.log("Supabase connection successful! Data:", data);
        }
      } catch (err) {
        console.error("Unexpected error connecting to Supabase:", err);
      }
    }
    testConnection();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />

          {/* 2. UPDATED THIS LINE TO USE THE COMPONENT */}
          <Route path="list-of-barangay" element={<ListOfBarangay />} />

          <Route path="about" element={<About />} />
          <Route path="programs" element={<div className="container" style={{ padding: '4rem 1.5rem' }}><h1>Programs & Projects</h1></div>} />
          <Route path="lgu" element={<div className="container" style={{ padding: '4rem 1.5rem' }}><h1>Local Government Units</h1></div>} />
          <Route path="organizations" element={<div className="container" style={{ padding: '4rem 1.5rem' }}><h1>Organizations</h1></div>} />
          <Route path="barangay-officials" element={<div className="container" style={{ padding: '4rem 1.5rem' }}><h1>Barangay Officials</h1></div>} />
          <Route path="appointment" element={<div className="container" style={{ padding: '4rem 1.5rem' }}><h1>Appointment</h1></div>} />
          <Route path="articles" element={<div className="container" style={{ padding: '4rem 1.5rem' }}><h1>Articles</h1></div>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout role="Admin" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="personnel" element={<PersonnelManagement />} />
        </Route>

        {/* Super Admin Routes */}
        <Route path="/super-admin" element={<AdminLayout role="Super Admin" />}>
          <Route index element={<SuperAdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
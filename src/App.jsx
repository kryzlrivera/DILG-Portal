import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/public/Home';
import AdminDashboard from './pages/admin/AdminDashboard';
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          {/* Placeholders for other public routes */}
          <Route path="about" element={<div className="container" style={{padding: '4rem 1.5rem'}}><h1>About Us</h1></div>} />
          <Route path="programs" element={<div className="container" style={{padding: '4rem 1.5rem'}}><h1>Programs & Projects</h1></div>} />
          <Route path="lgu" element={<div className="container" style={{padding: '4rem 1.5rem'}}><h1>Local Government Units</h1></div>} />
          <Route path="organizations" element={<div className="container" style={{padding: '4rem 1.5rem'}}><h1>Organizations</h1></div>} />
          <Route path="barangay-officials" element={<div className="container" style={{padding: '4rem 1.5rem'}}><h1>Barangay Officials</h1></div>} />
          <Route path="appointment" element={<div className="container" style={{padding: '4rem 1.5rem'}}><h1>Appointment</h1></div>} />
          <Route path="articles" element={<div className="container" style={{padding: '4rem 1.5rem'}}><h1>Articles</h1></div>} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout role="Admin" />}>
          <Route index element={<AdminDashboard />} />
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

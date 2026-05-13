import { supabase } from './supabase'
import { useEffect } from 'react'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/public/Home';
import About from './pages/public/About';
import History from './pages/public/History';
import ArticleList from './pages/public/ArticleList';
import ArticleDetail from './pages/public/ArticleDetail';
import AdminDashboard from './pages/admin/AdminDashboard';
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard';
import PersonnelManagement from './pages/admin/PersonnelManagement';
import AdminArticles from './pages/admin/AdminArticles';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ListOfBarangay from './pages/public/ListOfBarangay';
import Appointment from './pages/public/Appointment';
import Messages from './pages/public/Messages';
import EquipmentInventory from './pages/admin/EquipmentInventory';

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
          <Route path="appointment" element={<Appointment />} />
          <Route path="messages" element={<Messages />} />
          <Route path="faq" element={<div className="container" style={{ padding: '4rem 1.5rem' }}><h1>Frequently Asked Questions</h1></div>} />
          <Route path="history" element={<History />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/:articleId" element={<ArticleDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout role="Admin" /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="personnel" element={<PersonnelManagement />} />
          <Route path="articles" element={<AdminArticles />} />
          <Route path="documents" element={<AdminDashboard />} />
          <Route path="equipment" element={<EquipmentInventory />} />
        </Route>

        {/* Super Admin Routes */}
        <Route path="/super-admin" element={<ProtectedRoute allowedRoles={['super-admin']}><AdminLayout role="Super Admin" /></ProtectedRoute>}>
          <Route index element={<SuperAdminDashboard />} />
          <Route path="articles" element={<AdminArticles />} />
          <Route path="documents" element={<AdminDashboard />} />
          <Route path="equipment" element={<EquipmentInventory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
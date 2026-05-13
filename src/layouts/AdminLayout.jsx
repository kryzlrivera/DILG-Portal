import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Logo from '../components/Logo';

const AdminLayout = ({ role }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: 'var(--color-crimson-dark)', color: 'white', padding: '1.5rem' }}>
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Logo size={48} />
          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-yellow)', margin: 0 }}>DILG Portal</h2>
            <p style={{ fontSize: '0.875rem', opacity: 0.8, margin: 0 }}>{role} Dashboard</p>
          </div>
        </div>
        <nav>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li>
              <Link to={role === 'Admin' ? '/admin' : '/super-admin'} style={{ color: 'white', textDecoration: 'none' }}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to={role === 'Admin' ? '/admin/articles' : '/super-admin/articles'} style={{ color: 'white', textDecoration: 'none' }}>
                Articles
              </Link>
            </li>
            <li>
              <Link to={role === 'Admin' ? '/admin/documents' : '/super-admin/documents'} style={{ color: 'white', textDecoration: 'none' }}>
                Documents
              </Link>
            </li>
            {role === 'Admin' && (
              <li>
                <Link to="/admin/personnel" style={{ color: 'white', textDecoration: 'none' }}>
                  Personnel
                </Link>
              </li>
            )}
            <li>
              <Link to={role === 'Admin' ? '/admin/equipment' : '/super-admin/equipment'} style={{ color: 'white', textDecoration: 'none' }}>
                Equipment
              </Link>
            </li>
            <li>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>
                ← Back to Portal
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', backgroundColor: 'white', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--color-text-main)' }}>{role} Area</h1>
          <div>Welcome, {role}</div>
        </header>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

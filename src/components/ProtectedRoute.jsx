import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const savedUser = localStorage.getItem('dilgCurrentUser');
  if (!savedUser) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(savedUser);
    if (!allowedRoles.length || allowedRoles.includes(user.role)) {
      return children;
    }
  } catch (error) {
    localStorage.removeItem('dilgCurrentUser');
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;

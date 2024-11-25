import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated'); // Check admin authentication
  return isAuthenticated === 'true' ? children : <Navigate to="/admin/login" />;
}

export default ProtectedRoute;

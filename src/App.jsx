import React, { useEffect } from 'react';
import {BrowserRouter as Router,  Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/pages/Home';
import AdminPage from './components/pages/AdminPage';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AdminLogin from './components/auth/AdminLogin';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/admin' && location.pathname !== '/admin/login') {
      localStorage.removeItem('isAdminAuthenticated');
    }
  }, [location]);

  return (

      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
  );
}

export default App;

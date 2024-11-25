import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [adminKey, setAdminKey] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate the entered key with the environment variable
    const storedAdminKey = import.meta.env.VITE_ADMIN_KEY;

    if (adminKey === storedAdminKey) {
      localStorage.setItem('isAdminAuthenticated', 'true'); // Save authentication status
      navigate('/admin'); // Redirect to admin dashboard
    } else {
      alert('Invalid Admin Pass Key');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-300">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter Admin Pass Key"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
        >
          Login as Admin
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;

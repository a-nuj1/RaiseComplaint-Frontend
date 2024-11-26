import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDirections } from "react-icons/fa";


function AdminLogin() {
  const [adminKey, setAdminKey] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedAdminKey = import.meta.env.VITE_ADMIN_KEY;

    if (adminKey === storedAdminKey) {
      localStorage.setItem('isAdminAuthenticated', 'true'); 

      navigate('/admin'); 
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

      <div className="absolute top-4 sm:top-2 left-2 sm:left-2">
        <button
          onClick={()=>navigate('/login')}
          className="flex items-center justify-center px-2 py-2 h-9 text-white font-semibold bg-indigo-700 rounded-lg hover:bg-indigo-800 transition-all sm:relative sm:top-auto sm:left-auto"
        >
          <FaDirections className="mr-2 text-2xl" />
          Login as User
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;

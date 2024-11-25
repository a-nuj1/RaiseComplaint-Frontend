import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/api.js';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
  try {
    const { data } = await API.post('/login', { email, password });
    localStorage.setItem('authToken', data.token);
    navigate('/'); // Redirect after login
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed');
  }
  };

  return (
    <main className="w-full h-screen flex items-center justify-center bg-gray-400">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
        <p className="text-center text-gray-500 mt-2 mb-6">Welcome back! Please log in to continue.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              autoComplete="email"
              placeholder="Enter Your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-3 py-2 border rounded-lg text-gray-700 outline-none focus:border-indigo-500 transition duration-300"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Enter Your Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 px-3 py-2 border rounded-lg text-gray-700 outline-none focus:border-indigo-500 transition duration-300"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white font-semibold rounded-lg bg-indigo-700"
          >
            Log In
          </button>

          {/* Redirect to Register */}
          <div className="text-sm text-center mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;

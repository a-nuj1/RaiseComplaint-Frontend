import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import API from '../utils/api.js';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/signup', { name, email, password });
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <>
      
      <main className="w-full h-screen flex items-center justify-center  bg-gray-400" >
        <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Sign Up</h2>
          <p className="text-center text-gray-500 mt-2 mb-6">Create a new account to get started</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">Name</label>
              <input
                type="text"
                autoComplete="name"
                placeholder="Enter Your Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 px-3 py-2 border rounded-lg text-gray-700 outline-none focus:border-indigo-500 transition duration-300"
              />
            </div>
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
                autoComplete="new-password"
                placeholder="Enter Your Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-3 py-2 border rounded-lg text-gray-700 outline-none focus:border-indigo-500 transition duration-300"
              />
            </div>



            {/* Sign Up Button */}
            <button
              type="submit"
              className={`w-full py-2 mt-4 text-white font-semibold rounded-lg  bg-indigo-700 `}
            >
                Sign Up
            </button>

            {/* Redirect to Login */}
            <div className="text-sm text-center mt-4">
              Already have an account?{' '}
              <Link to={'/login'} className="text-indigo-600 font-semibold hover:underline">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Signup;

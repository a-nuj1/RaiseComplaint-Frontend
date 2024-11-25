import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api', // Change to your backend URL
});

// Automatically add token if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { FaDirections } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = () => {
    return localStorage.getItem("authToken") ? true : false;
  };

  const [complaint, setComplaint] = useState({
    title: "",
    description: "",
    category: "Product",
    priority: "Low",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplaint({ ...complaint, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isUserLoggedIn()) {
      alert('Please log in to submit a complaint.');
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      await API.post('/complaint', complaint, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to headers
        }
      });
      alert('Complaint submitted successfully!');
      setComplaint({
        title: '',
        description: '',
        category: 'Product',
        priority: 'Low',
      });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit complaint');
    }
  };

  const handleClick = () => {
    navigate("/admin/login");
  };

  return (
    <main
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgb(208 155 215 / 80%), rgb(128 209 125 / 50%)), url('https://images.unsplash.com/photo-1496205856088-91b021308c54?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className=" max-w-2xl p-5 sm:p-12 bg-white bg-opacity-95 rounded-2xl shadow-2xl">
        <h4 className="text-3xl sm:text-4xl font-semibold text-gray-800 text-center mb-6 flex items-center justify-center gap-1">
          📝 Submit Your Complaint
        </h4>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Complaint Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter Complaint Title"
              required
              value={complaint.title}
              onChange={handleInputChange}
              className="w-full mt-2 px-4 py-3 border rounded-lg text-gray-800 outline-none focus:border-indigo-500 transition duration-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe your issue"
              required
              value={complaint.description}
              onChange={handleInputChange}
              className="w-full mt-2 px-4 py-3 border rounded-lg text-gray-800 outline-none focus:border-indigo-500 transition duration-300 shadow-sm"
            ></textarea>
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={complaint.category}
              onChange={handleInputChange}
              className="w-full mt-2 px-4 py-3 border rounded-lg text-gray-800 outline-none focus:border-indigo-500 transition duration-300 shadow-sm"
            >
              <option value="Product">Product</option>
              <option value="Service">Service</option>
              <option value="Support">Support</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Priority
            </label>
            <div className="flex gap-6 mt-2">
              {["Low", "Medium", "High"].map((level) => (
                <label
                  key={level}
                  className="flex items-center gap-2 text-gray-800"
                >
                  <input
                    type="radio"
                    name="priority"
                    value={level}
                    checked={complaint.priority === level}
                    onChange={handleInputChange}
                    className="form-radio text-indigo-600 focus:ring-indigo-500"
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300 transition duration-300 transform hover:scale-105"
          >
            Submit Complaint
          </button>
        </form>
      </div>


              
      <div className="absolute top-4 sm:top-2 right-2 sm:right-2">
        <button
          onClick={handleClick}
          className="flex items-center justify-center px-2 py-2 h-9 text-white font-semibold bg-indigo-700 rounded-lg hover:bg-indigo-800 transition-all sm:relative sm:top-auto sm:right-auto"
        >
          <FaDirections className="mr-2 text-2xl" />
          Admin
        </button>
      </div>
    </main>
  );
};

export default Home;

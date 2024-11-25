import React, { useState } from "react";

const Home = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Complaint Submitted:", complaint);
    // Add backend integration logic here


    setComplaint({
      title: "",
      description: "",
      category: "Product",
      priority: "Low",
    });
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
      <div className="w-full max-w-3xl p-12 bg-white bg-opacity-95 rounded-2xl shadow-2xl ">
        <h3 className="text-4xl font-bold text-gray-800 text-center mb-6 flex items-center justify-center gap-2">
          📝 Submit Your Complaint
        </h3>
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
    </main>
  );
};

export default Home;

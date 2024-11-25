import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { complaints } from "../data/sampleData";

function AdminPage() {
  const [filter, setFilter] = useState("");
  const [filteredComplaints, setFilteredComplaints] = useState(complaints);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [status, setStatus] = useState("");

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    setFilteredComplaints(
      complaints.filter(
        (complaint) =>
          complaint.status.includes(value) || complaint.priority.includes(value)
      )
    );
  };

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setStatus(complaint.status);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedComplaint(null);
  };

  // const handleUpdate = async () => {
  //   // Example API call to update complaint details
  //   try {
  //     const response = await fetch(`/api/complaints/${selectedComplaint.id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ status }),
  //     });

  //     if (!response.ok) throw new Error("Failed to update complaint");

  //     // Update local state for demonstration purposes
  //     setFilteredComplaints((prev) =>
  //       prev.map((c) =>
  //         c.id === selectedComplaint.id ? { ...c, status } : c
  //       )
  //     );
  //     alert("Complaint updated successfully!");
  //     handleCloseModal();
  //   } catch (error) {
  //     console.error("Error updating complaint:", error);
  //     alert("Failed to update complaint.");
  //   }
  // };

  // const handleDelete = async () => {
  //   // Example API call to delete complaint
  //   try {
  //     const response = await fetch(`/api/complaints/${selectedComplaint.id}`, {
  //       method: "DELETE",
  //     });

  //     if (!response.ok) throw new Error("Failed to delete complaint");

  //     // Update local state for demonstration purposes
  //     setFilteredComplaints((prev) =>
  //       prev.filter((c) => c.id !== selectedComplaint.id)
  //     );
  //     alert("Complaint deleted successfully!");
  //     handleCloseModal();
  //   } catch (error) {
  //     console.error("Error deleting complaint:", error);
  //     alert("Failed to delete complaint.");
  //   }
  // };
  const handleUpdate = () => {
    handleCloseModal();
    console.log("Update complaint with id:", selectedComplaint.id);
  }

  const handleDelete = () => {
    handleCloseModal();
    console.log("Delete complaint with id:", selectedComplaint.id);
  }

  return (
    <div className="min-h-screen bg-gray-300 p-4">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
        Dashboard
      </h1>

      <div className="mb-2">
        <label
          className="block text-md font-medium text-gray-700 mb-2"
          htmlFor="filter"
        >
          Sort By:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="block w-60 px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300"
        >
          <option value="">All</option>
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>
      </div>

      <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Category</th>
            <th className="py-3 px-6 text-left">Priority</th>
            <th className="py-3 px-6 text-left">Date Submitted</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="text-left"></th>
          </tr>
        </thead>
        <tbody>
          {filteredComplaints.map((complaint) => (
            <tr key={complaint.id} className="border-b">
              <td className="py-3 px-6">{complaint.title}</td>
              <td className="py-3 px-6">{complaint.category}</td>
              <td className="py-3 px-6">{complaint.priority}</td>
              <td className="py-3 px-6">{complaint.date}</td>
              <td className="py-3 px-6">{complaint.status}</td>
              <td className="py-3 px-6">
              <button
                  onClick={() => handleViewDetails(complaint)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        className="fixed inset-0 bg-gray-100 z-5 flex items-center justify-center p-4"
      >
        <div className="fixed inset-0 bg-black bg-opacity-20" aria-hidden="true" />
        <div className="relative bg-gray-200 rounded-lg shadow-lg w-full max-w-lg p-6">
          <Dialog.Title className="text-2xl font-bold text-gray-800 mb-4">
            Complaint Details
          </Dialog.Title>
          {selectedComplaint && (
            <div className="space-y-3">
              <p>
                <strong>Name of User:</strong> {selectedComplaint.user}
              </p>
              <p>
                <strong>Email:</strong> {selectedComplaint.email}
              </p>
              <p>
                <strong>Title:</strong> {selectedComplaint.title}
              </p>
              <p>
                <strong>Description:</strong> {selectedComplaint.description}
              </p>
              <p>
                <strong>Category:</strong> {selectedComplaint.category}
              </p>
              <div>
                <label className="font-bold">Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                  <option value="InProgress">In Progress</option>

                </select>
              </div>
              <p>
                <strong>Date Submitted:</strong> {selectedComplaint.date}
              </p>
            </div>
          )}
          <div className="mt-6 flex justify-between">
            <button
              onClick={handleCloseModal}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Close
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Update
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default AdminPage;

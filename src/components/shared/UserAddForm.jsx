import axios from 'axios';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const UserAddForm = ({ setShowSignupForm, currentUser }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateContact = (contact) => {
    const phonePattern = /^\d{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return phonePattern.test(contact) || emailPattern.test(contact);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateContact(formData.contact)) {
      toast.error('Please enter a valid 10-digit phone number or email address.');
      return;
    }
    try {
      const { data } = await axios.post('/add-user', { formData, agentId: currentUser._id });
      if (data) {
        toast.success('User added successfully');
        setShowSignupForm(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50 animated-form">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl mx-4 relative">
        <button
          onClick={() => setShowSignupForm(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-darker-gray-light font-mono text-center">Add User</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-600 mb-2" htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2" htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2" htmlFor="contact">Phone Number or Email</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-darker-gray to-darker-gray-medium text-white font-semibold rounded-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAddForm;

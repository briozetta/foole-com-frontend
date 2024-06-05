import React, { useState, useEffect } from "react";
import {toast} from "react-toastify"
import { useSelector } from "react-redux";
import axios from "axios";

const AddressForm = ({ onClose, fetchUserAddress }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    mobileNo2: "",
    state: "",
    district: "",
    pincode: "",
    houseNo: "",
    locality: "",
    nearbyLandmark: "",
  });

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      await axios.post("/add-address", {
        userId: currentUser._id,
        address: formData,
      });
      fetchUserAddress();
      onClose();
    } catch (error) {
      toast.warning(error.response.data.message,{position:"top-center",autoClose:1000})
      console.error("Error adding address:", error);
    }
  };

  return (
    <div className="fixed   inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 animated-overlay">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-4xl animated-form"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute text-5xl top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <h2 className="text-lg sm:text-3xl font-bold mb-6 text-center text-darker-gray font-mono">
          Add New Address
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full p-1.5 sm:p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full p-1.5 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="mobileNo"
            placeholder="Mobile No"
            value={formData.mobileNo}
            onChange={handleInputChange}
            className="w-full p-1.5 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="mobileNo2"
            placeholder="Alternate Mobile No"
            value={formData.mobileNo2}
            onChange={handleInputChange}
            className="w-full p-1.5 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full p-1.5 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="district"
            placeholder="District"
            value={formData.district}
            onChange={handleInputChange}
            className="w-full p-1.5 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            className="w-full p-1.5 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="houseNo"
            placeholder="House No"
            value={formData.houseNo}
            onChange={handleInputChange}
            className="w-full p-1.5 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="locality"
            placeholder="Locality"
            value={formData.locality}
            onChange={handleInputChange}
            className="w-full p-1.5 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="nearbyLandmark"
            placeholder="Nearby Landmark"
            value={formData.nearbyLandmark}
            onChange={handleInputChange}
            className="w-full p-1.5 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-row gap-3">
          <button
           onClick={onClose}
            type="button"
            className="mt-6 w-full  bg-indigo-600 text-white p-1 sm:p-3 rounded-lg"
          >
            cancel
          </button>
          <button
            type="submit"
            className="mt-6 w-full bg-darker-gray-medium text-white p-1 sm:p-3 rounded-lg hover:bg-darker-gray-light transition duration-300"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;

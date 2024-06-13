import React from "react";
import axios from "axios";
import { GrRadialSelected } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

export default function AddressCard({
  currentUser,
  addresses,
  selectedAddress,
  handleAddressSelect,
  fetchUserAddress,
}) {
  const handleDelete = async (id) => {
    try {
      if (!id) {
        return toast.warning(
          "You cannot delete your primary address. To make changes, please update it from your profile."
        );
      }
      const response = await axios.delete(`/delete-address/${id}`, {
        params: {
          _id: currentUser._id,
        },
      });

      if (response.data) {
        fetchUserAddress();
      } else {
        console.error("Failed to delete address");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 drop-shadow-md shadow-darker-blue gap-6">
      {addresses.map((address, index) => (
        <div
          key={index}
          className={`relative border p-6 rounded-lg shadow-md cursor-pointer transition duration-300 transform ${
            selectedAddress === address
              ? "bg-blue-100 border-blue-400 scale-105"
              : "bg-blue-50 hover:bg-blue-50 border-darker-violet hover:border-blue-200"
          }`}
          onClick={() => handleAddressSelect(address)}
        >
          {selectedAddress === address && (
            <GrRadialSelected
              size={20}
              className="absolute top-2 right-2 text-blue-500"
            />
          )}
          <p className="font-semibold text-gray-800 flex gap-2">
            {address?.newUserfirstName || address?.firstName}
            <span>{address?.newUserlastName || address?.lastName}</span>
          </p>
          <p className="text-gray-900">{address?.mobileNo}</p>
          <p className="text-gray-900">{address?.email}</p>
          <p className="text-gray-900">{address?.mobileNo2}</p>
          <p className="text-gray-600">{address?.houseNo}</p>
          <p className="text-gray-600">
            {address?.pincode}, {address?.locality}
          </p>
          <p className="font-semibold text-gray-800">{address?.state}</p>
          <span className="flex justify-end text-darker-gray text-xl">
            <MdDelete
              onClick={() => {
                handleDelete(address._id);
              }}
            />
          </span>
        </div>
      ))}
    </div>
  );
}

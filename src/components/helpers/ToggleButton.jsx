import React, { useState, useEffect } from "react";
import axios from "axios";

const ToggleButton = ({ user }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Set isChecked based on user role
    setIsChecked(user.role === "Agent");
  }, [user.role]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
   
    axios.put(`/update-role/${user._id}`, { role: isChecked ? "Customer" : "Agent" })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error updating role:", error);
      });
  };

  return (
    <>
      <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          name="autoSaver"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
            isChecked ? "bg-darker-blue" : "bg-[#CCCCCE]"
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
              isChecked ? "translate-x-6" : ""
            }`}
          ></span>
        </span>
        <span
          className={`label flex items-center text-sm font-medium ${
            isChecked ? "text-green-400" : "text-black"
          }`}
        >
          <span className="pl-1"> {isChecked ? "On" : "Off"} </span>
        </span>
      </label>
    </>
  );
};

export default ToggleButton;

import React from 'react';
import logo from "../../assets/logo-main.png";
import { FaSpinner } from 'react-icons/fa';

export default function LoaderPage() {
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-100'>
      
        <img src={logo} alt="Loading" className='w-1/3 md:w-1/4 lg:w-1/6 drop-shadow-xl shadow-red-600' />
        <FaSpinner className="text-darker-gray animate-spin text-3xl sm:text-4xl" />
    
    </div>
  );
}

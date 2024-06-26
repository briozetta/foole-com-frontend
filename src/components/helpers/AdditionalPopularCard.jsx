import React from 'react'

export default function AdditionalPopularCard() {
  return (
    <div className="bg-white shadow-lg rounded-md p-5  flex flex-col justify-between">
        <div className='bg-gray-100 py-3'>
          <div className="flex justify-center items-center mb-4">
            <img src="https://beardo.in/cdn/shop/files/Beardo_Apex_Trimmer_A__Banner_2160x2160_03.jpg?v=1713352481&width=1946" alt="Beardo Ape-X 3-in-1 Trimmer"
             className="w-20 h-20 sm:w-36 sm:h-36 rounded-lg object-cover" />
          </div>
          <p className="text-center text-sm font-semibold text-gray-800 mb-2">Now Get The Grooming Done Right At Home</p>
          
          <div className="flex justify-center items-center mt-2">
          <span className="text-red-500 text-lg font-bold mr-2">-27%</span>
            <strong className="text-gray-800 text-lg font-bold mr-2">₹1,093.00</strong>
            <del className="text-gray-500">₹1,499.00</del>
          </div>
        </div>
        <div className="bg-gray-50 shadow-lg rounded-md p-5 mt-5 flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-4 text-darker-gray font-sans">Sign in for your best experience</h2>
        <button className="bg-darker-blue text-white poppins-semibold py-2 px-4 rounded hover:bg-yellow-500">
          Sign in securely
        </button>
      </div>
        <span className=" mt-6 block"></span>
      </div>
  )
}

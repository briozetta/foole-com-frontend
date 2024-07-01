import React from 'react';

export default function AdditionalPopularCard({ shuffledProducts }) {
  // Check if there are any products in the shuffledProducts array
  if (!shuffledProducts || shuffledProducts.length === 0) {
    return null; // Return null or a placeholder component if no products are available
  }

  // Pick a random product from the shuffledProducts array
  const randomIndex = Math.floor(Math.random() * shuffledProducts.length);
  const randomProduct = shuffledProducts[randomIndex];

  return (
    <div className="bg-white shadow-lg rounded-md p-5 flex flex-col justify-between">
      <div className='bg-gray-100 py-3'>
        <div className="flex justify-center items-center mb-4">
          <img
            src={randomProduct.images[0]}
            alt={randomProduct.productName}
            className="w-20 h-20 sm:w-36 sm:h-36 rounded-lg object-cover"
          />
        </div>
        <p className="text-center text-sm font-semibold text-gray-800 mb-2">
          {randomProduct.productName}
        </p>
        <div className="flex justify-center items-center mt-2">
          <span className="text-red-500 text-lg font-bold mr-2">-27%</span>
          <strong className="text-gray-800 text-lg font-bold mr-2">
            ₹{randomProduct.price}
          </strong>
          <del className="text-gray-500">₹1,499.00</del>
        </div>
      </div>
      <div className="bg-gray-50 shadow-lg rounded-md p-5 mt-5 flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-4 text-darker-gray font-sans">
          Sign in for your best experience
        </h2>
        <button className="bg-darker-blue text-white poppins-semibold py-2 px-4 rounded hover:bg-yellow-500">
          Sign in securely
        </button>
      </div>
    </div>
  );
}

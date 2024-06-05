import React from "react";

const EmptyCartMessage = () => {
  return (
    <div className="max-w-6xl mx-auto pt-32 bg-white shadow-lg mb-9 rounded-lg overflow-hidden">
      <div className="px-6 py-4 pt-11">
        <h1 className="font-bold text-3xl text-darker-gray mb-6 flex items-center">
          Shopping Cart
          <span className="ml-4 text-darker-gray-light rounded-full px-3 py-1 text-sm font-medium">
            0 items
          </span>
        </h1>
        <p>Your cart is currently empty.</p>
      </div>
    </div>
  );
};

export default EmptyCartMessage;

import React from "react";

export default function OrderSummary({ cartItems, shippingMethod,calculateTotal }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        Order Summary
      </h2>
      <div className="border sm:p-6 p-3 rounded-lg shadow-md bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 transition duration-300">
        {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between mb-4 items-center">
            <p className="text-gray-800 sm:text-lg text-xs font-semibold">
              {item.productName}
            </p>
            <div className="flex items-center space-x-2">
              <p className="text-gray-800">€{item.price}</p>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                Qty: {item.quantity}
              </span>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mb-4 py-2 border-t border-gray-200">
          <p className="text-gray-600">Delivery charge</p>
          <p className="text-gray-600">€36</p>
        </div>
        <div className="flex justify-between items-center mb-4 py-2  border-gray-200">
          <p className="text-gray-600 ">Delivery Method</p>
          <p className="text-gray-800 font-mono font-semibold">
            {shippingMethod}
          </p>
        </div>
        <div className="flex justify-between items-center font-bold text-xl text-gray-800 py-2 border-t border-gray-200">
          <p>Total</p>
          <p>€{calculateTotal().toFixed(2)}</p>
        </div>
        <button className="mt-6 w-full bg-gradient-to-r from-darker-gray to-darker-gray-medium text-white py-3 rounded-lg hover:from-darker-gray-medium hover:to-darker-gray-light transition duration-300 shadow-md transform hover:scale-105">
          Place order
        </button>
      </div>
    </div>
  );
}

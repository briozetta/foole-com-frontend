import React from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartItems = ({ cartItems, handleQuantityChange, handleRemove, totalDistinctItems, subtotal }) => {
  return (
    <div className="max-w-6xl mx-auto pt-32 bg-white shadow-lg mb-9 rounded-lg overflow-hidden">
      <div className="px-6 py-4 pt-11">
        <h1 className="font-bold text-3xl text-darker-gray mb-6 flex items-center">
          Shopping Cart{" "}
          <span className="ml-4 text-darker-gray-light rounded-full px-3 py-1 text-sm font-medium">
            {totalDistinctItems} items
          </span>
        </h1>
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row items-center mb-6 p-4 bg-gray-50 rounded-lg shadow"
          >
            <img
              className="w-24 h-24 object-contain rounded-lg mb-4 md:mb-0"
              src={item?.images}
              alt={item?.productName}
            />
            <div className="ml-0 md:ml-6 flex-1">
              <h1 className="font-semibold text-lg text-darker-gray-medium">
                {item?.productName}
              </h1>
              <h2
                className={`text-base px-1 rounded-md bg-zinc-200 inline-block ${
                  item?.availability === "Out of stock"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {item?.availability}
              </h2>

              <h3 className="text-gray-500">{item?.category}</h3>
              <div className="flex items-center mt-2">
                <button
                  className="text-gray-500 hover:text-red-500 transition-colors mr-2"
                  onClick={() => handleRemove(item.productId)}
                >
                  <FaTrash />
                </button>

                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => handleQuantityChange(item._id, -1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{item.quantity}</span>
                  <button
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => handleQuantityChange(item._id, 1)}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="ml-0 md:ml-6 text-lg text-darker-gray font-bold">
              ${item.price.toFixed(2)}
            </div>
          </div>
        ))}
        <div className="border-t border-gray-300 pt-6">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Subtotal</span>
            <span>${cartItems?.userId}</span>
          </div>
          <div className="flex justify-between text-darker-gray font-bold text-xl">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
        <Link to={'/place-order'}>
        <button className="flex mt-7 m-4 ml-auto p-2 btnHover rounded-xl bg-darker-blue text-sm sm:text-xl
         text-white">
          Proceed to Checkout</button>
        </Link>
    </div>
  );
};

export default CartItems;
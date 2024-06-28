import React from "react";
import { useLocation } from "react-router-dom";
import DelivaryAddress from "../../components/helpers/DelivaryAddress";
import DelivaryItems from "../../components/helpers/DelivaryItems";

export default function ViewFullOrder() {
  const location = useLocation();
  const order = location.state.order;

  return (
    <>
      <div className="px-4 py-8 mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center lg:text-left">
          User Order
        </h1>
        {order?.length === 0 ? (
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
            <h2 className="text-2xl font-semibold text-red-800 text-center">
              This user has not purchased anything yet
            </h2>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-lg p-8">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
              <div className="mb-4 lg:mb-0">
                <p className="text-gray-500 text-center lg:text-left">
                  <span className="text-lg font-medium text-green-500">
                    Order Placed:
                  </span>{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="text-center lg:text-right">
                <p className="text-2xl font-bold text-gray-800">
                  <span className="text-gray-600">Total Amount: </span>
                  {order.totalAmount}
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-end items-center mb-6">
                <span
                  className={`text-lg px-4 py-1 rounded-full font-semibold ${
                    order.isShipped
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {order.isShipped ? "Shipped" : "Unshipped"}
                </span>
              </div>
              <DelivaryAddress order={order}/>
              <DelivaryItems order={order}/>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

import React from "react";
import { useLocation } from "react-router-dom";

export default function ViewFullOrder() {
  const location = useLocation();
  const order = location.state.order;
  console.log(order);
  return (
    <>
      <div className="padding-x mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">User Orders</h1>
        {order?.length === 0 ? (
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
            <h2 className="text-2xl font-semibold text-red-800">
              This user has not purchased anything yet
            </h2>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-gray-500">
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
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-800">
                  <span className="text-gray-600">Total Amount: </span>
                  {order.totalAmount}
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Delivery Address</h2>
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
              <div className="bg-gray-50 flex justify-between p-6 rounded-lg shadow-inner mb-6">
               <div>
               <p className="text-gray-700 mb-1">
                  <strong>Name: </strong>
                  {order.shippingAddress?.firstName}{" "}
                  {order.shippingAddress?.lastName}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>House No: </strong>
                  {order.shippingAddress?.houseNo}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Locality: </strong>
                  {order.shippingAddress?.locality}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Nearby Landmark: </strong>
                  {order.shippingAddress?.nearbyLandmark}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>District: </strong>
                  {order.shippingAddress?.district}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>State: </strong>
                  {order.shippingAddress?.state}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Pincode: </strong>
                  {order.shippingAddress?.pincode}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Email: </strong>
                  {order.shippingAddress?.email}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Mobile No: </strong>
                  {order.shippingAddress?.mobileNo}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Mobile No 2: </strong>
                  {order.shippingAddress?.mobileNo2}
                </p>
               </div>
               <div className="hidden lg:block">
                <h1>Total Items: <span>{order.items.length}</span></h1>
                {order.items?.map((item,index)=>(
                    <div key={index} className="flex gap-2">
                    <h2>{item.productName}:</h2>
                    <span>Qty{item.quantity}</span>
                    </div>
                ))}
               </div>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg">
                {order.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex justify-between items-center py-4 border-b last:border-b-0"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.images[0]}
                        alt={item.productName}
                        className="w-20 h-20 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <p className="text-lg font-semibold text-gray-800 hover:underline">
                          {item.productName}
                        </p>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-semibold text-gray-800">
                        {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

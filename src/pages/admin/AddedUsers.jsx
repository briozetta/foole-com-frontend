import React from "react";
import { useLocation } from "react-router-dom";

export default function AddedUsers() {
  const location = useLocation();
  const details = location.state.details;
 
  return (
    <>
      <div className="padding-x mx-auto px-4 py-8">
      
        {details.orders?.length === 0 ? (
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
            <h2 className="text-2xl font-semibold text-red-800">
              This user has not purchased anything yet
            </h2>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-lg p-8">
            
            <div className="text-right mt-8">
              <p className="text-3xl font-bold text-gray-800">
                <span className="text-gray-600">Total Commission: </span>
                ₹{details.totalCommission.toFixed(2)}
              </p>
            </div>
            {details.orders.map((order, orderIndex) => (
              <div key={orderIndex} className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
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
                    <span className="text-gray-600">
                      Commission earned from this purchase: ₹{order.commission.toFixed(2)}
                    </span>
                  </div>
                    
                    <span
                    className={`py-1 px-3 rounded-full text-xs poppins-bold ${
                      order.isShipped
                        ? "bg-purple-200 text-purple-600"
                        : "bg-red-700 text-darker-gray"
                    }`}
                  >
                   {order.isShipped ?"Shipped":"Unshipped"}
                  </span>
                </div>

                <div className="bg-gray-100 p-6 rounded-lg">
                  {order.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 border-b last:border-b-0"
                    >
                      <div className="flex items-center mb-4 md:mb-0">
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
                          ₹{item.price.toFixed(2)}
                        </p>
                      </div>
                     
                    </div>
                  ))}
                
                  <p className="text-xl text-right font-semibold text-gray-800 mt-4">
                    Total: ₹{order.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

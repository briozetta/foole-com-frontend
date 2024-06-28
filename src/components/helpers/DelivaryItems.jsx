import React from "react";

export default function DelivaryItems({ order }) {
  return (
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
            <p className="text-xl font-semibold text-gray-800">{item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

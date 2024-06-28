import React from "react";

export default function DelivaryAddress({ order }) {
  return (
    <div className="bg-gray-50 flex flex-col lg:flex-row justify-between p-6 rounded-lg shadow-inner mb-6">
      <div className="lg:w-1/2 lg:pr-6 ">
        <h2 className="text-2xl mb-3 text-gray-800 font-semibold">
          Delivery <span className="text-gray-600">Address</span>
        </h2>
        <p className="text-darker-gray poppins-semibold-italic mb-2">
          <strong className="text-darker-gray-medium poppins-regular">
            Name:{" "}
          </strong>
          {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
        </p>
        <p className="text-darker-gray mb-2 poppins-semibold">
          <strong className="text-darker-gray-medium poppins-regular">
            House No:{" "}
          </strong>
          {order.shippingAddress?.houseNo}
        </p>
        <p className="text-darker-gray mb-2 poppins-semibold">
          <strong className="text-darker-gray-medium poppins-regular">
            Locality:{" "}
          </strong>
          {order.shippingAddress?.locality}
        </p>
        <p className="text-darker-gray mb-2 poppins-semibold">
          <strong className="text-darker-gray-medium poppins-regular">
            Nearby Landmark:{" "}
          </strong>
          {order.shippingAddress?.nearbyLandmark}
        </p>
        <p className="text-darker-gray mb-2 poppins-semibold">
          <strong className="text-darker-gray-medium poppins-regular">
            District:{" "}
          </strong>
          {order.shippingAddress?.district}
        </p>
        <p className="text-darker-gray mb-2 poppins-semibold">
          <strong className="text-darker-gray-medium poppins-regular">
            State:{" "}
          </strong>
          {order.shippingAddress?.state}
        </p>
        <p className="text-darker-gray mb-2 poppins-semibold">
          <strong className="text-darker-gray-medium poppins-regular">
            Pincode:{" "}
          </strong>
          {order.shippingAddress?.pincode}
        </p>
        <p className="text-darker-gray mb-2 poppins-semibold">
          <strong className="text-darker-gray-medium poppins-regular">
            Email:{" "}
          </strong>
          {order.shippingAddress?.email || "not found"}
        </p>
        <p className="text-darker-gray poppins-semibold">
          <strong className="text-darker-gray-medium poppins-regular">
            Mobile No:{" "}
          </strong>
          {order.shippingAddress?.mobileNo}
        </p>
        <p className="text-darker-gray poppins-semibold">
          <strong className="text-darker-gray-medium poppins-regular">
            Mobile No 2:{" "}
          </strong>
          {order.shippingAddress?.mobileNo2}
        </p>
      </div>
      <div className="hidden lg:block lg:w-1/2">
        <div className="text-center">
          <h1 className="text-darker-blue text-xl mb-2">
            Total Items: <span>{order.items.length}</span>
          </h1>
        </div>
        {order.items?.map((item, index) => (
          <div key={index} className="flex justify-center mb-2">
            <h2 className="text-darker-gray-medium font-semibold">
              {item.productName}:
            </h2>
            <span className="text-red-800 ml-2">Qty {item.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const MyOrders = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/my-orders", {
        params: {
          userId: currentUser._id,
        },
      });
      const sortedOrders = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setMyOrders(sortedOrders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false); // Stop loading even if there is an error
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentUser]);

  return (
    <div className="container padding mx-auto p-6">
      <h1 className="text-3xl font-bold mt-16 mb-6 text-left text-darker-gray">
        My Orders
      </h1>
      {loading ? (
        <div>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white border rounded-lg p-6 mb-6 shadow-lg">
              <Skeleton height={30} width={`60%`} />
              <Skeleton height={20} width={`40%`} className="mb-4" />
              <Skeleton height={20} width={`80%`} className="mb-2" />
              <Skeleton height={20} width={`80%`} />
            </div>
          ))}
        </div>
      ) : (
        myOrders.map((order, index) => (
          <div key={index} className="bg-white border rounded-lg p-6 mb-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Order #{order._id}
                </h2>
                <p className="text-gray-600">
                  Placed on{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">
                  <span className="text-darker-gray-medium">Total: </span>
                  {order.totalAmount}
                </p>
                <p className="text-sm font-medium text-green-600">Order Placed</p>
              </div>
            </div>
            <div className="border-t pt-4">
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex justify-between items-center py-4 border-b last:border-b-0">
                  <div className="flex items-center">
                    <img
                      src={item.images[0]}
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded mr-4"
                    />
                    <div>
                      <Link to={`/product/${item.productId}`}>
                        <p className="text-lg hover:underline font-semibold text-gray-800">
                          {item.productName}
                        </p>
                      </Link>
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
        ))
      )}
    </div>
  );
};

export default MyOrders;

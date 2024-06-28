import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UserDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const user = location.state?.user;

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full
         text-blue-600" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="padding-x text-3xl font-bold mt-11 text-left text-darker-gray">
        User Orders
      </h1>
      {user.orders?.length === 0 ? (
        <div className="container p-6 mt-1 padding-x">
          <h2 className="text-2xl font-semibold text-gray-800">
            This user has not purchased anything yet
          </h2>
        </div>
      ) : (
        user.orders?.map((order, index) => (
          <div key={index} className="container p-6 mt-1 padding-x ">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {index + 1} Order #
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
                  <span className="text-darker-gray-medium">Earned reward: </span>
                  {order.commission}
                </p>
                <p className="text-sm font-medium text-green-600">Order Placed</p>
              </div>
            </div>

            <div className="border-t pt-4 bg-slate-50">
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex justify-between items-center py-4 border-b last:border-b-0">
                  <div className="flex items-center">
                    <img
                      src={item.images[0]}
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded mr-4"
                    />
                    <div>
                      <p className="text-lg hover:underline font-semibold text-gray-800">
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
        ))
      )}
    </>
  );
}

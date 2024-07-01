import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderListTable from "../../components/shared/OrderListTable";
import { FaSpinner } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const ShippedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const pathname = "/admin-shipped-orders"
 
  const fetchItems = async () => {
    try {
      const { data } = await axios.get("/get-all-orders");
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleUpdateOrder = async (_id) => {
    try {
      await axios.put("/update-order", { _id });
      fetchItems();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="padding-x mx-auto p-4">
      {loading ? (
        <div className="flex justify-center text-gray-800 items-center mt-9 h-32">
          <FaSpinner className="animate-spin text-3xl sm:text-4xl" />
          <span className="px-2 poppins-semibold">Loading..</span>
        </div>
      ) : (
        orders.length > 0 && (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <OrderListTable
                pathname={pathname}
                orders={orders}
                handleUpdateOrder={handleUpdateOrder}
              />
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default ShippedOrders;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AgentListSection from "../../components/shared/AgentListSection";

export default function UserInfoPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const user = location.state;

  const fetchAgentUser = async () => {
    try {
  
      const { data } = await axios.get("/agent-user", {
        params: {
          agentId: user._id,
        },
      });
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching agent user data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgentUser();
  }, []);

  const grandTotal = orders
    .map(order => order.totalCommission)
    .reduce((sum, commission) => sum + commission, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-r from-zinc-500 to-gray-900 padding-x p-6">
      <div className="max-w-8xl mx-auto bg-gray-800 pb-6 shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gray-900 p-6 text-white text-center">
          <h1 className="text-3xl font-bold">Agent Profile</h1>
        </div>

        {/* Agent Details Section */}
        <div className="p-6 flex sm:flex-row flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-darker-blue">
              Agent Details
            </h2>
            <p className="text-gray-100 italic">
              <span className="poppins-semibold">Name:</span> {user.firstName}{" "}
              {user.lastName}
            </p>
            <p className="text-gray-100 italic">
              <span className="poppins-semibold">Email:</span>{" "}
              {user.email || user.phone}
            </p>
          </div>
          <>
            <h3 className="flex flex-col justify-center bg-slate-100 rounded-xl px-2 py-1 mt-4 text-lg text-green-500 poppins-semibold italic">
              <span className="poppins-regular text-gray-900">Total Commission</span> ₹{grandTotal}
            </h3>
          </>
        </div>

        {/* Agent Users List Section */}
        <AgentListSection orders={orders} loading={loading} />
      </div>
    </div>
  );
}

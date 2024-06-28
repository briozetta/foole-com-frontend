import React from 'react'
import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom'

export default function AgentListSection({ orders, loading }) {
  return (
    <div className="px-6">
      <h2 className="text-2xl font-semibold mb-3 text-blue-600">
        Users List
      </h2>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center text-gray-100 items-center mt-9 h-32">
          <FaSpinner className=" animate-spin text-3xl sm:text-4xl" />
          <span className="px-2 poppins-semibold">Loading..</span>
        </div>
        ) : (
          <table className="min-w-full bg-gray-900 rounded-lg">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-950 text-gray-300 poppins-extrabold uppercase text-sm">
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Phone or Email</th>
                <th className="py-3 px-6 text-left">Total Purchase</th>
                <th className="py-3 px-6 text-left">Total Expenditure</th>
                <th className="py-3 px-6 text-left">Earned Commission</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-gray-100 text-sm font-light">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-3">
                    No users found.
                  </td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700 hover:bg-gray-600"
                  >
                    <td className="py-3 px-6 text-left">{index + 1}</td>
                    <td className="py-3 px-6 text-left">
                      <Link
                        to="/admin-added-user"
                        state={{ details: order }}
                        className="flex items-center"
                      >
                        <img
                          className="w-6 h-6 rounded-full mr-2"
                          src={`https://png.pngtree.com/png-vector/20190321/ourmid/pngtree-vector-users-icon-png-image_856952.jpg`}
                          alt="avatar"
                        />
                        <span className="poppins-semibold">
                          {order.user?.firstName} {order.user?.lastName}
                        </span>
                        <span className="ml-2 text-red-500 text-xs">
                          View More
                        </span>
                      </Link>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span
                        className={`py-1 px-3 rounded-full text-xs poppins-bold ${
                          order.user.email
                            ? "bg-purple-200 text-purple-600"
                            : "bg-green-300 text-darker-gray"
                        }`}
                      >
                        {order.user?.email || order.user?.phone}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left poppins-semibold">
                      {order.orders.length}
                    </td>
                    <td className="py-3 px-6 text-left poppins-light text-green-500">
                      $
                      {order.orders
                        ?.reduce(
                          (sum, orderItem) => sum + orderItem.totalAmount,
                          0
                        )
                        .toFixed(2)}
                    </td>
                    <td className="py-3 px-6 text-left poppins-semibold-italic">
                      ${order.totalCommission.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

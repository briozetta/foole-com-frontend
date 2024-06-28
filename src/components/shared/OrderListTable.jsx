import React from 'react'
import { Link } from "react-router-dom";

export default function OrderListTable({orders,handleUpdateOrder}) {
  return (
    <>
    <tbody>
            {orders
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((order, index) => (
                <tr key={order._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {index + 1}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          srcSet={`${order.items[0]?.images[0]} 1x, ${order.items[0]?.images[1]} 2x`}
                          src={order.items[0]?.images[0]}
                          alt="images"
                          className="w-10 h-10 rounded-full mr-4"
                        />
                      </div>
                      <div>
                        <p className="text-gray-900 whitespace-no-wrap font-semibold">
                          {order.items[0]?.productName} and more...
                        </p>
                        <p className="text-gray-600 whitespace-no-wrap">
                          {order.shippingAddress?.newUserfirstName ||
                            order.shippingAddress?.firstName}{" "}
                          {order.shippingAddress?.houseNo}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                  </td>
                  <td
                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    onClick={() => handleUpdateOrder(order._id)}
                  >
                    <span
                      className={`px-3 py-1 rounded-full text-xs cursor-pointer font-semibold ${
                        order.isShipped
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.isShipped ? "Shipped" : "Unshipped"}
                    </span>

                    <Link
                      to="/admin-view-order"
                      state={{ order}}
                      className="text-blue-500 px-3 hover:underline"
                    >
                      See More
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
    </>
  )
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

export default function MyAgents() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/get-all-users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="padding-x mx-auto p-6 bg-gray-100 min-h-screen">
      <h1
        className="text-3xl font-extrabold text-gray-800 mb-6 text-left"
        style={{ fontFamily: "Poppins" }}
      >
        My Agents
      </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        {loading ? (
          <div className="flex justify-center items-center mt-9 h-60">
            <FaSpinner className="text-darker-gray animate-spin text-3xl sm:text-4xl" />
            <span className="px-2 poppins-semibold">Loading..</span>
          </div>
        ) : (
          <table className="min-w-full bg-white">
            <thead className="bg-gradient-to-r from-blue-400 to-purple-600 text-white">
              <tr>
                <th
                  className="py-4 px-6 text-left text-sm font-medium uppercase tracking-wider"
                  style={{ fontFamily: "Poppins" }}
                >
                  #
                </th>
                <th
                  className="py-4 px-6 text-left text-sm font-medium uppercase tracking-wider"
                  style={{ fontFamily: "Poppins" }}
                >
                  Name
                </th>
                <th
                  className="py-4 px-6 text-left text-sm font-medium uppercase tracking-wider"
                  style={{ fontFamily: "Poppins" }}
                >
                  Email / Phone
                </th>
                <th
                  className="py-4 px-6 text-left text-sm font-medium uppercase tracking-wider"
                  style={{ fontFamily: "Poppins" }}
                >
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users
                .filter(
                  (user) => user.role !== "Admin" && user.role === "Agent"
                )
                .map((user, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td
                      className="py-4 px-6 whitespace-nowrap text-sm text-gray-700"
                      style={{ fontFamily: "Poppins" }}
                    >
                      {index + 1}
                    </td>
                    <td
                      className="py-4 px-6 whitespace-nowrap text-sm text-gray-700 font-semibold italic"
                      style={{ fontFamily: "Poppins" }}
                    >
                      {user.firstName}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                      {user.email ? (
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {user.email}
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                          {user.phone}
                        </span>
                      )}
                    </td>
                    <Link to="/admin-user-details" state={user}>
                      <td
                        className="py-4 px-6 whitespace-nowrap font-semibold hover:underline cursor-pointer text-gray-900"
                        style={{ fontFamily: "Poppins" }}
                      >
                        View details
                      </td>
                    </Link>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

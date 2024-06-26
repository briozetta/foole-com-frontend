import React, { useEffect, useState } from "react";
import ToggleButton from "./helpers/ToggleButton";
import axios from "axios";
import { toast } from "react-toastify";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("/get-all-users")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <div className="flex justify-center h-1/2 items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-darker-blue h-12 w-12 mr-2"></div>
          <p className="text-darker-gray-medium font-semibold">
            Loading please wait...
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col padding-x bg-white shadow-lg pb-8 rounded-lg">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full text-left text-base text-gray-800">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      First
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4">
                      All details
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Agent Permission
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter((user) => user.role !== "Admin")
                    .map((user, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-indigo-100 transition-colors duration-200"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-semibold text-indigo-700">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 poppins-regular-italic text-indigo-900">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="whitespace-nowrap  px-6 py-4 text-indigo-900">
                          <span
                            className={`rounded-md px-1 text-sm ${
                              user.phone
                                ? "bg-green-400 text-darker-gray"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {user.email || user.phone}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-darker-blue hover:underline cursor-pointer">
                          View details
                        </td>
                        <td className="whitespace-nowrap px-8 py-4">
                          <ToggleButton user={user} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

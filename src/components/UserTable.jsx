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

  if(loading){
    return <>
     <div className="flex justify-center h-1/2 items-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-darker-blue h-12 w-12 mr-2"></div>
        <p className="text-darker-gray-medium font-semibold">Loading please wait...</p>
      </div>
    </>
  }
  
  
  return (
    <>
      <div className="flex flex-col bg-gray-50 shadow-md padding-x">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left  font-light text-surface text-darker-gray">
                <thead className="border-b border-neutral-200 font-medium text-lg dark:border-white/10">
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
                        className="border-b text-darker-blue font-medium border-neutral-200 dark:border-white/10"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {user.email}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          Profit and details
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

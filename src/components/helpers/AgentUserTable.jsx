import React from 'react'
import { Link } from 'react-router-dom';
import { setTotalRewardEarns } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';

export default function AgentUserTable({users}) {
  const dispatch = useDispatch();
  const totalCommissionSum = users.reduce((sum, user) => sum + user.totalCommission, 0);
  dispatch(setTotalRewardEarns(totalCommissionSum));

  return (
    <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="w-full bg-gray-950 text-gray-50 poppins-extrabold uppercase text-sm">
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Phone or Email</th>
              <th className="py-3 px-6 text-left">Total purchase</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Earned commission</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-3">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
               
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{index + 1}</td>
                  <td className="py-3 px-6 text-left">
                    <Link
                      to='/agent-user-details'
                      state={{ user: user}}

                      className="flex items-center"
                    >
                      <div className="flex items-center">
                        <img
                          className="w-6 h-6 rounded-full mr-2"
                          src={`https://png.pngtree.com/png-vector/20190321/ourmid/pngtree-vector-users-icon-png-image_856952.jpg`}
                          alt="avatar"
                        />
                        <span className="poppins-semibold">
                          {user.user?.firstName}
                        </span>
                      <span className="ml-2 text-red-500 text-xs">
                        View More
                      </span>
                      </div>
                      
                    </Link>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span
                      className={`py-1 px-3 rounded-full text-xs poppins-bold ${
                        user.user.email
                          ? "bg-purple-200 text-purple-600"
                          : "bg-green-300 text-darker-gray"
                      }`}
                    >
                      {user.user?.phone || user.user?.email}
                    </span>
                  </td>
                  <td className="py-3 poppins-semibold px-6 text-left">
                    {user.orders?.length}
                  </td>
                  <td className="py-3 px-6 poppins-light text-left">Active</td>
                  <td className="py-3 px-6 text-left poppins-semibold-italic">
                  ₹{user.totalCommission.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
  )
}

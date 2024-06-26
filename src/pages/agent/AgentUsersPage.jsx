import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AgentUserTable from "../../components/helpers/AgentUserTable";

export default function AgentUsersPage() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const { currentUser } = useSelector((state) => state.user);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      if (!currentUser || !currentUser._id) {
        throw new Error("Invalid current user");
      }
      const { data } = await axios.get("/agent-user", {
        params: {
          agentId: currentUser._id,
        },
      });
      setUsers(data);
    } catch (err) {
      console.error("Error fetching user address:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto padding-x py-6 h-screen bg-slate-900">
      {loading ? (
        <div className="text-center text-white padding">Loading...</div>
      ) : (
        <AgentUserTable users={users}/>
      )}
    </div>
  );
}

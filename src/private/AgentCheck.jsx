import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const useAgentCheck = (userId) => {
  const [isAgent, setIsAgent] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`/agent/${userId}`);
        setIsAgent(response.data);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, [userId]);

  return isAgent;
};

const AgentCheck = ({ userId }) => {
  const isAgent = useAgentCheck(userId);

  if (isAgent === null) {
    return null; 
  }

  if (isAgent && isAgent.role !== "Agent") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AgentCheck;

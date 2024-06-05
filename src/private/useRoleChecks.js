// src/hooks/useRoleChecks.js
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const useRoleChecks = () => {
    const [isAgent, setIsAgent] = useState();
    const { currentUser } = useSelector((state) => state.user);
    const location = useLocation();
    useEffect(() => {
        if (!currentUser || !currentUser._id) {
            return; 
        }
        const fetchUserRole = async () => {
            try {
                const response = await axios.get(`/agent/${currentUser._id}`);
                setIsAgent(response.data.role === "Agent");
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };

        fetchUserRole();

    }, [currentUser]);

    const isAdminRoute = () => {
        return currentUser && currentUser.role === 'Admin' && location.pathname.startsWith('/admin');
    };

    const isAgentRoute = () => {
        return isAgent && location.pathname.startsWith('/agent');
    };

    return { isAdminRoute, isAgentRoute };
};

export default useRoleChecks;

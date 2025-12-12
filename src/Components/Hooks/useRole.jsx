import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role = '', } = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data.role;
        }
    })

    return {
        role: role === "admin" ? "Admin" : role === "tutor" ? "Tutor" : "Student"
    };
};

export default useRole;
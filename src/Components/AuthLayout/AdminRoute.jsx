import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Loading from '../Loading/Loading';
import Forbidden from '../Forbidden/Forbidden';

const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'Admin') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;
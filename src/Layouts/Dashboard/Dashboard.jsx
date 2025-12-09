import React from 'react';
import useAuth from '../../Components/Hooks/useAuth';
import Logo from '../../Components/Logo/Logo';


const Dashboard = () => {

    const { user } = useAuth();


    return (
        <div className="flex flex-col justify-center items-center  ">
            <Logo className=""></Logo>
            <h5 className="text-3xl flex text-center my-5">Dashboard</h5>
        </div>
    );
};

export default Dashboard;
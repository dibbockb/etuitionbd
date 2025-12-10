import React from 'react';
import useAuth from '../../Components/Hooks/useAuth';
import Logo from '../../Components/Logo/Logo';
import PostTuition from './PostTuition';
import BecomeTutor from './BecomeTutor';
import { Outlet } from 'react-router';


const Dashboard = () => {

    const { user } = useAuth();


    return (
        <div className="flex flex-col justify-center items-center  ">
            <br />
            <Logo className=""></Logo>
            <h5 className="text-5xl flex text-center my-2 text-white">Dashboard</h5>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;
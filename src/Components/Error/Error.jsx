import React from 'react';
import Logo from '../Logo/Logo';
import { NavLink, useNavigate } from 'react-router';
import { MdOutlineArrowBackIos } from 'react-icons/md';

const Error = () => {
    const navigate = useNavigate();
    return (

        <div className="flex flex-col justify-center items-center">
            <br />
            <br />
            <br />
            <Logo></Logo>
           <img className="rounded-full mt-20" src="/error.jpg" alt="err-img" />
           <br />
           <br />
           <NavLink to='/' className="btn btn-ghost"> <MdOutlineArrowBackIos /> Back to home</NavLink>
        </div>
    );
};

export default Error;
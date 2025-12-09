import React from 'react';
import { NavLink } from 'react-router';
import Logo from '../Logo/Logo';

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm flex justify-between px-50">

                <div className="navbar-start">
                    <Logo></Logo>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-5">
                        <NavLink to={"/"}>Home</NavLink>
                        <NavLink to={"/tuitions"}>Dashboard</NavLink>
                        <NavLink to={"/contact"}>Contact</NavLink>
                    </ul>
                </div>



                <div className="navbar-end gap-2">
                    <NavLink to={"/login"}>Login</NavLink>
                    <NavLink to={"/register"}>Register</NavLink>
                </div>

            </div>
        </div>
    );
};

export default Navbar;
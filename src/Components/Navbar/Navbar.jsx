import React from 'react';
import Logo from '../Logo/Logo';
import { NavLink } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';



const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then((result) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Logged Out",
                    showConfirmButton: false,
                    timer: 1000
                });
            })
    }

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm flex justify-between px-50">

                <div className="navbar-start">
                    <Logo></Logo>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        <NavLink className="btn btn-ghost" to={"/"}>Home</NavLink>
                        <NavLink className="btn btn-ghost" to={"/dashboard"}>Dashboard</NavLink>
                        <NavLink className="btn btn-ghost" to={"/contact"}>Contact</NavLink>
                    </ul>
                </div>



                {user ? <button onClick={handleLogOut}>logout</button> : <div className="navbar-end gap-2">
                    <NavLink className="btn btn-ghost" to={"/login"}>Login</NavLink>
                    <NavLink className="btn btn-ghost" to={"/register"}>Register</NavLink>
                </div>}

            </div>
        </div>
    );
};

export default Navbar;
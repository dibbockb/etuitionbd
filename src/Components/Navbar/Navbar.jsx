import React from 'react';
import Logo from '../Logo/Logo';
import { NavLink, useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import { FaUserLarge } from 'react-icons/fa6';




const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

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

                <div className="">
                    <Logo></Logo>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        <NavLink className="btn btn-ghost" to={"/"}>Home</NavLink>
                        <NavLink className="btn btn-ghost" to={"/dashboard"}>Dashboard</NavLink>
                        {!user && <NavLink className="btn btn-ghost" to={"/contact"}>Contact</NavLink>}
                        {user && <NavLink className="btn btn-ghost" to={"/contact"}>Tutors</NavLink>}
                        {user && <NavLink className="btn btn-ghost" to={"/contact"}>Tuitions</NavLink>}
                    </ul>
                </div>



                {user ?
                    <div>

                        <div className="dropdown dropdown-bottom dropdown-center rounded-full flex justify-center items-center ">

                            <div tabIndex={0} role="button" className="btn btn-ghost rounded-full">
                                {user.photoURL ? <img className='w-9 h-9 rounded-full mr-2' src={user.photoURL} alt="User Profile" title={user.displayName} /> : <FaUserLarge />}</div>

                            <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <a className="flex justify-center text-center text-xl underline mb-3" >{user.displayName}</a>
                                <NavLink className="btn btn-ghost" to={"/dashboard"}>Dashboard</NavLink>
                                <button className="btn btn-ghost" onClick={handleLogOut}>Logout</button>
                            </ul>
                        </div>
                    </div>
                    :
                    <div className="">
                        <NavLink className="btn btn-ghost" to={"/login"}>Login</NavLink>
                        <NavLink className="btn btn-ghost" to={"/register"}>Register</NavLink>
                    </div>}

            </div>
        </div>
    );
};

export default Navbar;
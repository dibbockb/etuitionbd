import React from "react";
import Logo from "../Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate } from "react-router";

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
                    timer: 1000,
                });
                navigate("/");
            })
            .catch((error) => {
                console.error("error");
            });
    };

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm flex justify-between px-50">
                <div className="">
                    <Logo></Logo>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        <NavLink className="btn btn-ghost" to={"/"}>
                            Home
                        </NavLink>
                        <NavLink className="btn btn-ghost" to={"/dashboard"}>
                            Dashboard
                        </NavLink>
                        {!user && (
                            <NavLink className="btn btn-ghost" to={"/contact"}>
                                Contact
                            </NavLink>
                        )}
                        {user && (
                            <NavLink className="btn btn-ghost" to={"/tutors"}>
                                Tutors
                            </NavLink>
                        )}
                        {user && (
                            <NavLink className="btn btn-ghost" to={"/tuitions"}>
                                Tuitions
                            </NavLink>
                        )}
                    </ul>
                </div>

                {user ? (
                    <div>
                        <div className="dropdown dropdown-bottom dropdown-center rounded-full flex justify-center items-center ">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost rounded-full"
                            >
                                {user.photoURL ? (
                                    <img
                                        className="w-9 h-9 rounded-full"
                                        src={user.photoURL}
                                        alt="User Profile"
                                        title={user.displayName}
                                    />
                                ) : (
                                    <FaUserLarge />
                                )}
                            </div>

                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow">

                                <li className="text-center py-2 text-xl font-medium border-b border-gray-200 mb-2">
                                    {user.displayName}</li>

                                <li><a
                                    onClick={() => navigate("/dashboard")}
                                    className="btn btn-ghost justify-center">
                                    Dashboard</a></li>

                                <li><button
                                    onClick={handleLogOut}
                                    className="btn btn-ghost justify-center text-red-600">
                                    Logout</button></li>
                            </ul>

                        </div>
                    </div>
                ) : (
                    <div className="">
                        <NavLink className="btn btn-ghost" to={"/login"}>
                            Login
                        </NavLink>
                        <NavLink className="btn btn-ghost" to={"/register"}>
                            Register
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;

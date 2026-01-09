import React from "react";
import Logo from "../Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { GoSun, GoMoon } from "react-icons/go";
import { BiSolidDashboard } from "react-icons/bi";
import { FiPower } from "react-icons/fi";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const [theme, setTheme] = React.useState(localStorage.getItem("theme") || "dark");

    React.useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you Sure want to Log Out",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Logout",
        })
            .then((result) => {
                if (result.isConfirmed) {
                    logOut();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Logged Out",
                        showConfirmButton: false,
                        timer: 1000,
                    });
                    navigate("/");
                }
            })
            .catch((error) => {
                console.error("error");
            });
    };

    return (
        <div>
            <div className="navbar bg-white/80 dark:bg-base-100/80 backdrop-blur-md sticky top-0 z-50 border-b border-base-content/5 shadow-sm flex justify-between px-4 md:px-8 lg:px-20 transition-all duration-300">
                <div className="">
                    <Logo />
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        <NavLink className="btn btn-ghost rounded-lg" to={"/"}>
                            Home
                        </NavLink>
                        <NavLink className="btn btn-ghost rounded-lg" to={"/dashboard"}>
                            Dashboard
                        </NavLink>
                        {!user && (
                            <NavLink className="btn btn-ghost rounded-lg" to={"/contact"}>
                                Contact
                            </NavLink>
                        )}
                        {user && (
                            <NavLink className="btn btn-ghost rounded-lg" to={"/tutors"}>
                                Tutors
                            </NavLink>
                        )}
                        {user && (
                            <NavLink className="btn btn-ghost rounded-lg" to={"/tuitions?page=1&limit=5"}>
                                Tuitions
                            </NavLink>
                        )}
                    </ul>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <button
                        onClick={toggleTheme}
                        className=" text-xl hover:rotate-30 transition-transform ease-in"
                        aria-label="Toggle Theme"
                    >
                        {theme === "light" ? <GoMoon /> : <GoSun />}
                    </button>

                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar online p-0 transition-all"
                            >
                                <div className="w-10 rounded-full">
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt="User Profile"
                                            title={user.displayName}
                                        />
                                    ) : (
                                        <div className="bg-neutral text-neutral-content rounded-full w-full h-full flex items-center justify-center">
                                            <FaUserLarge />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <ul tabIndex={0} className="dropdown-content menu bg-white dark:bg-base-100 rounded-2xl p-2 shadow-2xl w-64 border border-gray-200 dark:border-white/10 mt-4 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 text-base-content">
                                <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5 mb-2">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Signed in as</p>
                                    <p className=" font-bold ">{user.displayName}</p>
                                </div>

                                <li>
                                    <button
                                        onClick={() => navigate("/dashboard/profile")}
                                        className="rounded-xl flex items-center gap-3 py-3 px-4  hover:bg-primary/10 transition-colors mb-1 active:scale-95"
                                    >
                                        <FaUserLarge className="text-lg" />
                                        <span className="font-semibold">My Profile</span>
                                    </button>
                                </li>

                                <li>
                                    <button
                                        onClick={() => navigate("/dashboard")}
                                        className="rounded-xl flex items-center gap-3 py-3 px-4 hover:bg-primary/10 transition-colors mb-1 active:scale-95"
                                    >
                                        <BiSolidDashboard className="text-lg" />
                                        <span className="font-semibold">Dashboard</span>
                                    </button>
                                </li>

                                <div className="h-px bg-gray-100 dark:bg-white/5 my-2 mx-2"></div>

                                <li>
                                    <button
                                        onClick={handleLogOut}
                                        className="rounded-xl flex items-center gap-3 py-3 px-4 text-error hover:bg-error/10 transition-colors active:scale-95"
                                    >
                                        <FiPower className="text-lg" />
                                        <span className="font-semibold">Sign Out</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex items-center">
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
        </div>
    );
};

export default Navbar;

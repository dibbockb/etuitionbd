import React from 'react';
import useAuth from '../../Components/Hooks/useAuth';
import useRole from '../../Components/Hooks/useRole';
import Logo from '../../Components/Logo/Logo';
import { Outlet, NavLink } from 'react-router';
import { FaListUl, FaChalkboardTeacher, FaUsersCog } from 'react-icons/fa';
import { RiGraduationCapFill, RiHome7Fill } from 'react-icons/ri';
import { MdAdminPanelSettings, MdOutlineArrowBackIos } from 'react-icons/md';
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { IoAddOutline } from 'react-icons/io5';
import { FaUserGraduate } from 'react-icons/fa6';
import { BiSolidDashboard } from "react-icons/bi";
import { PiListDashesFill } from "react-icons/pi";
import { BsCheckAll } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { HiMiniListBullet } from "react-icons/hi2";
import { Fade } from "react-awesome-reveal";

const Dashboard = () => {
    const { user } = useAuth();
    const { role } = useRole();

    const isAdmin = role === "Admin";
    const isTutor = role === "Tutor";
    const isStudent = role === "Student";

    return (
        <div className="bg-linear-to-br from-[#0f172a] via-[#101828] to-[#1e293b] min-h-screen">
            <div className="flex flex-col md:flex-row max-w-7xl mx-auto h-screen">

                {/* //panel  */}
                <aside className="w-full md:w-80 border-r border-black/30 flex flex-col">
                    <div className="p-8 text-center border-b border-black/30">
                        <Logo />
                        <br />
                        <h2 className="text-2xl font-bold text-white">{user?.displayName}</h2>
                        <p className="text-gray-200 text-lg mt-2 flex items-center justify-center gap-2">
                            {isAdmin && 
                            <><MdAdminPanelSettings /> Admin</>}
                            {isTutor && 
                            <><FaUserGraduate /> Tutor</>}
                            {isStudent && 
                            <><FaUserGraduate /> Student</>}
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-3 mt-3 px-3 flex-1">
                        <NavLink
                            to="/dashboard"
                            end
                            className={({ isActive }) =>
                                `w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${isActive ? "bg-[#00bba7] text-black shadow-lg" : "text-gray-300 hover:bg-white/10"}`
                            }
                        >
                            <BiSolidDashboard className="text-2xl" />
                            <span className="text-lg font-medium">Dashboard</span>
                        </NavLink>

                        {/* ------------------------------------------------------- */}
                        {/* //student dashboard buttons */}

                        {isStudent &&
                            <NavLink
                                to="/dashboard/new-tuition"
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${isActive ? "bg-[#00bba7] text-black shadow-lg" : "text-gray-300 hover:bg-white/10"}`
                                }
                            >
                                <IoAddOutline className="text-3xl" />
                                <span className="text-lg font-medium">Add Tuition</span>
                            </NavLink>
                        }

                        {isStudent &&
                            <NavLink
                                to="/dashboard/my-tuitions"
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${isActive ? "bg-[#00bba7] text-black shadow-lg" : "text-gray-300 hover:bg-white/10"}`
                                }
                            >
                                <FaListUl className="text-2xl shrink-0" />
                                <span className="text-lg font-medium">My Tuitions</span>
                            </NavLink>
                        }

                        {isStudent &&
                            <NavLink
                                to="/dashboard/my-tutors"
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${isActive ? "bg-[#00bba7] text-black shadow-lg" : "text-gray-300 hover:bg-white/10"}`
                                }
                            >
                                <RiGraduationCapFill className="text-2xl" />
                                <span className="text-lg font-medium">Tutors</span>
                            </NavLink>
                        }

                        {isStudent &&
                            <NavLink
                                to="/dashboard/my-payments"
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all  ${isActive ? "bg-[#00bba7] text-black shadow-lg" : "text-gray-300 hover:bg-white/10"}`
                                }
                            >
                                <MdOutlineAttachMoney className="text-2xl" />
                                <span className="text-lg font-medium">Payments</span>
                            </NavLink>
                        }

                        {isStudent &&
                            <NavLink
                                to="/dashboard/profile"
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${isActive ? "bg-[#00bba7] text-black shadow-lg" : "text-gray-300 hover:bg-white/10"}`
                                }
                            >
                                <IoIosSettings className="text-2xl" />
                                <span className="text-lg font-medium">Profile</span>
                            </NavLink>
                        }

                        {/* ------------------------------------------------------- */}
                        {/* //tutor dashboard buttons */}
                        {isTutor &&
                            <NavLink
                                to="/dashboard/applied-tuitions"
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${isActive ? "bg-[#00bba7] text-black shadow-lg" : "text-gray-300 hover:bg-white/10"}`
                                }
                            >
                                <PiListDashesFill className="text-2xl" />
                                <span className="text-lg font-medium">My Applications</span>
                            </NavLink>
                        }

                        {isTutor &&
                            <NavLink
                                to="/dashboard/approved-tuitions"
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${isActive ? "bg-[#00bba7] text-black shadow-lg" : "text-gray-300 hover:bg-white/10"}`
                                }
                            >
                                <BsCheckAll className="text-2xl" />
                                <span className="text-lg font-medium">Ongoing Tuitions</span>
                            </NavLink>
                        }

                        {isTutor &&
                            <NavLink
                                to="/dashboard/revenue"
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${isActive ? "bg-[#00bba7] text-black shadow-lg" : "text-gray-300 hover:bg-white/10"}`
                                }
                            >
                                <RiMoneyDollarCircleLine className="text-2xl" />
                                <span className="text-lg font-medium">Revenue</span>
                            </NavLink>
                        }


                        {/* ------------------------------------------------------- */}
                        {/* //admin dashboard buttons */}
                        {isAdmin && 
                        <NavLink
                            to="/dashboard/admin/manage-users"
                            className={({ isActive }) =>
                                `w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${isActive ? "bg-[#00bba7] text-black shadow-lg" : "text-gray-300 hover:bg-white/10"}`
                            }
                        >
                            <FaUsersCog className="text-2xl" />
                            <span className="text-lg font-medium">Manage Users</span>
                        </NavLink>}

                        {isAdmin && 
                        <NavLink
                            to="/dashboard/admin/manage-applications"
                            className={({ isActive }) =>
                                `w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${isActive ? "bg-[#00bba7] text-black shadow-lg" : "text-gray-300 hover:bg-white/10"}`
                            }
                        >
                            <HiMiniListBullet className="text-2xl" />
                            <span className="text-lg font-medium">Manage Applications</span>
                        </NavLink>}
                    </div>
                    
                    <NavLink to='/' className="w-50 flex justify-center items-center gap-4 rounded-xl transition-all mx-auto  mb-3 text-gray-300 hover:bg-white/10 py-3" > 
                        <MdOutlineArrowBackIos className="text-2xl" /> 
                        <span className="text-lg font-medium">Back to home</span>
                    </NavLink>
                </aside>

                {/* //outlet */}
                <main className="flex-1 w-full p-2 md:p-10  overflow-y-auto">
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-10 min-h-screen">
                        <Fade><Outlet /></Fade>
                    </div>
                </main>

            </div>
        </div>
    );
};

export default Dashboard;
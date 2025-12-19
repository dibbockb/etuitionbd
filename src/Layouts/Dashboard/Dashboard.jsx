import React from "react";
import useAuth from "../../Components/Hooks/useAuth";
import useRole from "../../Components/Hooks/useRole";
import Logo from "../../Components/Logo/Logo";
import { Outlet, NavLink } from "react-router";
import { FaListUl, FaChalkboardTeacher, FaUsersCog } from "react-icons/fa";
import { RiGraduationCapFill, RiHome7Fill } from "react-icons/ri";
import { MdAdminPanelSettings, MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";
import { PiListDashesFill } from "react-icons/pi";
import { BsCheckAll } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { HiMiniCurrencyDollar, HiMiniListBullet } from "react-icons/hi2";
import { Fade } from "react-awesome-reveal";
import { LiaHistorySolid } from "react-icons/lia";
import { FiPower } from "react-icons/fi";
import Swal from "sweetalert2";
import { TbUserFilled } from "react-icons/tb";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const { role } = useRole();

  const isAdmin = role === "Admin";
  const isTutor = role === "Tutor";
  const isStudent = role === "Student";

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
    <div className="bg-[#0f172a] ">
      <div className="flex flex-col md:flex-row min-h-screen">
        <aside className="w-full md:w-80 lg:w-96 border-r border-black/30 flex flex-col">
          <div className="p-8 text-center border-b border-black/30">
            <Logo />
            <br />
            <h2 className="text-xl font-bold text-white">
              {user?.displayName}
            </h2>
            <p className="text-gray-200 text-lg mt-2 flex items-center justify-center gap-2">
              {isAdmin && (
                <>
                  <MdAdminPanelSettings /> Admin
                </>
              )}
              {isTutor && (
                <>
                  <FaUserGraduate /> Tutor
                </>
              )}
              {isStudent && (
                <>
                  <FaUserGraduate /> Student
                </>
              )}
            </p>
          </div>


          <div className="flex flex-row md:flex-col gap-3 px-3 py-5 flex-1 overflow-x-auto md:overflow-visible">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `w-full flex items-center justify-center md:justify-start gap-4 px-6 py-4 rounded-xl transition-all ${isActive
                  ? "bg-[#00bba7] text-black shadow-lg"
                  : "text-gray-300 hover:bg-white/10"
                }`
              }
            >
              <BiSolidDashboard className="text-2xl" />
              <span className="text-lg font-medium hidden md:inline">Dashboard</span>
            </NavLink>

            {/* ------------------------------------------------------- */}
            {/* //student dashboard buttons */}

            {isStudent && (
              <NavLink
                to="/dashboard/new-tuition"
                className={({ isActive }) =>
                  `w-full flex items-center justify-center md:justify-start gap-4 px-6 py-4 rounded-xl transition-all ${isActive
                    ? "bg-[#00bba7] text-black shadow-lg"
                    : "text-gray-300 hover:bg-white/10"
                  }`
                }
              >
                <IoAddOutline className="text-3xl" />
                <span className="text-lg font-medium hidden md:inline">Add Tuition</span>
              </NavLink>
            )}

            {isStudent && (
              <NavLink
                to="/dashboard/my-tuitions"
                className={({ isActive }) =>
                  `w-full flex items-center justify-center md:justify-start gap-4 px-6 py-4 rounded-xl transition-all ${isActive
                    ? "bg-[#00bba7] text-black shadow-lg"
                    : "text-gray-300 hover:bg-white/10"
                  }`
                }
              >
                <FaListUl className="text-2xl shrink-0" />
                <span className="text-lg font-medium hidden md:inline">My Tuitions</span>
              </NavLink>
            )}

            {isStudent && (
              <NavLink
                to="/dashboard/applicants"
                className={({ isActive }) =>
                  `w-full flex items-center justify-center md:justify-start gap-4 px-6 py-4 rounded-xl transition-all ${isActive
                    ? "bg-[#00bba7] text-black shadow-lg"
                    : "text-gray-300 hover:bg-white/10"
                  }`
                }
              >
                <RiGraduationCapFill className="text-2xl" />
                <span className="text-lg font-medium hidden md:inline">Applicants</span>
              </NavLink>
            )}

            {isStudent && (
              <NavLink
                to="/dashboard/my-payments"
                className={({ isActive }) =>
                  `w-full flex items-center justify-center md:justify-start gap-4 px-6 py-4 rounded-xl transition-all ${isActive
                    ? "bg-[#00bba7] text-black shadow-lg"
                    : "text-gray-300 hover:bg-white/10"
                  }`
                }
              >
                <LiaHistorySolid className="text-2xl" />
                <span className="text-lg font-medium hidden md:inline">Payment History</span>
              </NavLink>
            )}

            {/* ------------------------------------------------------- */}
            {/* //tutor dashboard buttons */}
            {isTutor && (
              <NavLink
                to="/dashboard/applied-tuitions"
                className={({ isActive }) =>
                  `w-full flex items-center justify-center md:justify-start gap-4 px-6 py-4 rounded-xl transition-all ${isActive
                    ? "bg-[#00bba7] text-black shadow-lg"
                    : "text-gray-300 hover:bg-white/10"
                  }`
                }
              >
                <PiListDashesFill className="text-2xl" />
                <span className="text-lg font-medium hidden md:inline">My Applications</span>
              </NavLink>
            )}

            {isTutor && (
              <NavLink
                to="/dashboard/approved-tuitions"
                className={({ isActive }) =>
                  `w-full flex items-center justify-center md:justify-start gap-4 px-6 py-4 rounded-xl transition-all ${isActive
                    ? "bg-[#00bba7] text-black shadow-lg"
                    : "text-gray-300 hover:bg-white/10"
                  }`
                }
              >
                <BsCheckAll className="text-2xl" />
                <span className="text-lg font-medium hidden md:inline">Ongoing Tuitions</span>
              </NavLink>
            )}

            {isTutor && (
              <NavLink
                to="/dashboard/revenue"
                className={({ isActive }) =>
                  `w-full flex items-center justify-center md:justify-start gap-4 px-6 py-4 rounded-xl transition-all ${isActive
                    ? "bg-[#00bba7] text-black shadow-lg"
                    : "text-gray-300 hover:bg-white/10"
                  }`
                }
              >
                <RiMoneyDollarCircleLine className="text-2xl" />
                <span className="text-lg font-medium hidden md:inline">Revenue</span>
              </NavLink>
            )}



            {/* ------------------------------------------------------- */}
            {/* //admin dashboard buttons */}
            {isAdmin && (
              <NavLink
                to="/dashboard/admin/manage-users"
                className={({ isActive }) =>
                  `w-full flex items-center justify-center md:justify-start gap-4 px-6 py-4 rounded-xl transition-all ${isActive
                    ? "bg-[#00bba7] text-black shadow-lg"
                    : "text-gray-300 hover:bg-white/10"
                  }`
                }
              >
                <FaUsersCog className="text-2xl" />
                <span className="text-lg font-medium hidden md:inline">Manage Users</span>
              </NavLink>
            )}

            {isAdmin && (
              <NavLink
                to="/dashboard/admin/manage-tuitions"
                className={({ isActive }) =>
                  `w-full flex items-center justify-center md:justify-start gap-4 px-6 py-4 rounded-xl transition-all ${isActive
                    ? "bg-[#00bba7] text-black shadow-lg"
                    : "text-gray-300 hover:bg-white/10"
                  }`
                }
              >
                <HiMiniListBullet className="text-2xl" />
                <span className="text-lg font-medium hidden md:inline">Manage Tuitions</span>
              </NavLink>
            )}

            {isAdmin && (
              <NavLink
                to="/dashboard/admin/platform-revenue"
                className={({ isActive }) =>
                  `w-full flex items-center justify-center md:justify-start gap-4 px-6 py-4 rounded-xl transition-all ${isActive
                    ? "bg-[#00bba7] text-black shadow-lg"
                    : "text-gray-300 hover:bg-white/10"
                  }`
                }
              >
                <HiMiniCurrencyDollar className="text-2xl" />
                <span className="text-lg font-medium hidden md:inline">Platform Revenue</span>
              </NavLink>
            )}

            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `w-full flex items-center justify-center md:justify-start gap-4 px-6 py-4 rounded-xl transition-all ${isActive
                  ? "bg-[#00bba7] text-black shadow-lg"
                  : "text-gray-300 hover:bg-white/10"
                }`
              }
            >
              <TbUserFilled className="text-2xl" />
              <span className="text-lg font-medium hidden md:inline">Profile</span>
            </NavLink>
          </div>



          <div className="flex md:hidden justify-around items-center text-center border-t border-black/30 pt-4 pb-6 px-4">
            <NavLink
              to="/"
              className="w-50 flex justify-center items-center gap-4 rounded-xl transition-all mx-auto  mb-3 text-gray-300 hover:bg-white/10 py-3"
            >
              <MdOutlineArrowBackIos className="" />
              <span className="text-lg font-medium hidden md:inline">Back to home</span>
            </NavLink>

            <button
              onClick={handleLogOut}
              className="w-10 h-10 rounded-full flex justify-center items-center text-center gap-4 border border-red-400/10 hover:border-white-700 transition-all mx-auto mb-3 text-gray-300 hover:bg-red-500/80 hover:text-black py-3"
            >
              <FiPower className="mx-auto" />
            </button>


          </div>
        </aside>

        {/* //outlet */}
        <main className="flex-1 w-full  overflow-y-auto">
          <div className="backdrop-blur-xl  rounded-3xl shadow-xl border-white/10 min-h-screen min-w-fit">
            <Fade>
              <Outlet />
            </Fade>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

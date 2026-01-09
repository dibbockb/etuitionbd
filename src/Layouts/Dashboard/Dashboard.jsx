import React from "react";
import useAuth from "../../Components/Hooks/useAuth";
import useRole from "../../Components/Hooks/useRole";
import Logo from "../../Components/Logo/Logo";
import { Outlet, NavLink, useNavigate } from "react-router";
import { FaListUl, FaUsersCog } from "react-icons/fa";
import { RiGraduationCapFill, RiHome7Fill, RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";
import { PiListDashesFill } from "react-icons/pi";
import { BsCheckAll } from "react-icons/bs";
import { HiMiniCurrencyDollar, HiMiniListBullet } from "react-icons/hi2";
import { Fade } from "react-awesome-reveal";
import { LiaHistorySolid } from "react-icons/lia";
import { FiPower } from "react-icons/fi";
import { TbUserFilled } from "react-icons/tb";
import { GoSun, GoMoon } from "react-icons/go";
import Swal from "sweetalert2";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const { role } = useRole();
  const navigate = useNavigate();
  const [theme, setTheme] = React.useState(localStorage.getItem("theme") || "dark");

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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
    }).then((result) => {
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
    });
  };

  return (
    <div className="bg-base-200 text-base-content md:h-screen md:overflow-hidden transition-colors duration-300">
      <div className="flex flex-col md:flex-row h-full">
        <aside className="w-full md:w-80 lg:w-96 bg-[#f8fafc] dark:bg-base-100 border-r border-base-300 flex flex-col shadow-lg md:h-screen sticky top-0 md:relative z-20 transition-all duration-300">
          <div className="p-4 md:p-8 text-center border-b border-base-300 flex md:flex-col items-center justify-between md:justify-center">
            <Logo className="mx-auto"/>
            <br />
            <div className="hidden md:block">
              <h2 className="text-xl font-bold mt-2 ">
                {user?.displayName}
              </h2>
              <p className="text-slate-500 dark:text-base-content/70 text-lg mt-2 flex items-center justify-center gap-2">
                {isAdmin && (
                  <>
                    <MdAdminPanelSettings className="text-primary" /> Admin
                  </>
                )}
                {isTutor && (
                  <>
                    <FaUserGraduate className="text-primary" /> Tutor
                  </>
                )}
                {isStudent && (
                  <>
                    <FaUserGraduate className="text-primary" /> Student
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-row md:flex-col gap-1 px-2 md:px-4 py-2 md:py-6 flex-1 overflow-x-auto md:overflow-y-auto custom-scrollbar no-scrollbar">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all whitespace-nowrap ${isActive
                  ? "bg-primary text-slate-900 dark:text-white font-bold shadow-md scale-[1.02]"
                  : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 dark:text-base-content/70 dark:hover:bg-base-content/10 dark:hover:text-base-content"
                }`
              } 
            >
              <BiSolidDashboard className="text-xl" />
              <span className="text-sm md:text-lg font-medium">Dashboard</span>
            </NavLink>

            {isStudent && (
              <>
                <NavLink
                  to="/dashboard/new-tuition"
                  className={({ isActive }) =>
                    `flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all whitespace-nowrap ${isActive
                      ? "bg-primary text-slate-900 dark:text-white font-bold shadow-md scale-[1.02]"
                      : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 dark:text-base-content/70 dark:hover:bg-base-content/10 dark:hover:text-base-content"
                    }`
                  }
                >
                  <IoAddOutline className="text-2xl" />
                  <span className="text-sm md:text-lg font-medium">Add Tuition</span>
                </NavLink>
                <NavLink
                  to="/dashboard/my-tuitions"
                  className={({ isActive }) =>
                    `flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all whitespace-nowrap ${isActive
                      ? "bg-primary text-slate-900 dark:text-white font-bold shadow-md scale-[1.02]"
                      : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 dark:text-base-content/70 dark:hover:bg-base-content/10 dark:hover:text-base-content"
                    }`
                  }
                >
                  <FaListUl className="text-xl shrink-0" />
                  <span className="text-sm md:text-lg font-medium">My Tuitions</span>
                </NavLink>
                <NavLink
                  to="/dashboard/applicants"
                  className={({ isActive }) =>
                    `flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all whitespace-nowrap ${isActive
                      ? "bg-primary text-slate-900 dark:text-white font-bold shadow-md scale-[1.02]"
                      : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 dark:text-base-content/70 dark:hover:bg-base-content/10 dark:hover:text-base-content"
                    }`
                  }
                >
                  <RiGraduationCapFill className="text-xl" />
                  <span className="text-sm md:text-lg font-medium">Applicants</span>
                </NavLink>
                <NavLink
                  to="/dashboard/my-payments"
                  className={({ isActive }) =>
                    `flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all whitespace-nowrap ${isActive
                      ? "bg-primary text-slate-900 dark:text-white font-bold shadow-md scale-[1.02]"
                      : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 dark:text-base-content/70 dark:hover:bg-base-content/10 dark:hover:text-base-content"
                    }`
                  }
                >
                  <LiaHistorySolid className="text-xl" />
                  <span className="text-sm md:text-lg font-medium">Payment History</span>
                </NavLink>
              </>
            )}

            {isTutor && (
              <>
                <NavLink
                  to="/dashboard/applied-tuitions"
                  className={({ isActive }) =>
                    `flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all whitespace-nowrap ${isActive
                      ? "bg-primary text-slate-900 dark:text-white font-bold shadow-md scale-[1.02]"
                      : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 dark:text-base-content/70 dark:hover:bg-base-content/10 dark:hover:text-base-content"
                    }`
                  }
                >
                  <PiListDashesFill className="text-xl" />
                  <span className="text-sm md:text-lg font-medium">My Applications</span>
                </NavLink>
                <NavLink
                  to="/dashboard/approved-tuitions"
                  className={({ isActive }) =>
                    `flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all whitespace-nowrap ${isActive
                      ? "bg-primary text-slate-900 dark:text-white font-bold shadow-md scale-[1.02]"
                      : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 dark:text-base-content/70 dark:hover:bg-base-content/10 dark:hover:text-base-content"
                    }`
                  }
                >
                  <BsCheckAll className="text-xl" />
                  <span className="text-sm md:text-lg font-medium">Ongoing Tuitions</span>
                </NavLink>
                <NavLink
                  to="/dashboard/revenue"
                  className={({ isActive }) =>
                    `flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all whitespace-nowrap ${isActive
                      ? "bg-primary text-slate-900 dark:text-white font-bold shadow-md scale-[1.02]"
                      : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 dark:text-base-content/70 dark:hover:bg-base-content/10 dark:hover:text-base-content"
                    }`
                  }
                >
                  <RiMoneyDollarCircleLine className="text-xl" />
                  <span className="text-sm md:text-lg font-medium">Revenue</span>
                </NavLink>
              </>
            )}

            {isAdmin && (
              <>
                <NavLink
                  to="/dashboard/admin/manage-users"
                  className={({ isActive }) =>
                    `flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all whitespace-nowrap ${isActive
                      ? "bg-primary text-slate-900 dark:text-white font-bold shadow-md scale-[1.02]"
                      : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 dark:text-base-content/70 dark:hover:bg-base-content/10 dark:hover:text-base-content"
                    }`
                  }
                >
                  <FaUsersCog className="text-xl" />
                  <span className="text-sm md:text-lg font-medium">Manage Users</span>
                </NavLink>
                <NavLink
                  to="/dashboard/admin/manage-tuitions"
                  className={({ isActive }) =>
                    `flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all whitespace-nowrap ${isActive
                      ? "bg-primary text-slate-900 dark:text-white font-bold shadow-md scale-[1.02]"
                      : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 dark:text-base-content/70 dark:hover:bg-base-content/10 dark:hover:text-base-content"
                    }`
                  }
                >
                  <HiMiniListBullet className="text-xl" />
                  <span className="text-sm md:text-lg font-medium">Manage Tuitions</span>
                </NavLink>
                <NavLink
                  to="/dashboard/admin/platform-revenue"
                  className={({ isActive }) =>
                    `flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all whitespace-nowrap ${isActive
                      ? "bg-primary text-slate-900 dark:text-white font-bold shadow-md scale-[1.02]"
                      : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 dark:text-base-content/70 dark:hover:bg-base-content/10 dark:hover:text-base-content"
                    }`
                  }
                >
                  <HiMiniCurrencyDollar className="text-xl" />
                  <span className="text-sm md:text-lg font-medium">Platform Revenue</span>
                </NavLink>
              </>
            )}

            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all whitespace-nowrap ${isActive
                  ? "bg-primary text-slate-900 dark:text-white font-bold shadow-md scale-[1.02]"
                  : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 dark:text-base-content/70 dark:hover:bg-base-content/10 dark:hover:text-base-content"
                }`
              }
            >
              <TbUserFilled className="text-xl" />
              <span className="text-sm md:text-lg font-medium">Profile</span>
            </NavLink>
          </div>

          <div className="flex flex-row md:flex-col justify-around items-center text-center border-t border-base-300 py-4 px-4 gap-2 hidden md:flex">
            <NavLink
              to="/"
              className="flex justify-center items-center gap-2 md:gap-3 rounded-xl transition-all text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 dark:text-base-content/70 dark:hover:bg-base-content/10 dark:hover:text-base-content px-3 md:px-4 py-2 md:py-3 flex-1 md:w-full whitespace-nowrap"
            >
              <RiHome7Fill className="text-xl" />
              <span className="text-sm md:text-lg font-medium">Home</span>
            </NavLink>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-circle text-xl"
                aria-label="Toggle Theme"
              >
                {theme === "light" ? <GoMoon /> : <GoSun />}
              </button>

              <button
                onClick={handleLogOut}
                className="btn btn-ghost btn-circle text-error hover:bg-error/10"
                title="Logout"
              >
                <FiPower className="text-xl" />
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 w-full overflow-y-auto bg-base-200">
          <div className="p-3 md:p-8 lg:p-12 min-h-screen">
            <div className="bg-white dark:bg-base-100 rounded-2xl md:rounded-3xl shadow-xl border border-base-300 p-4 md:p-10 min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-8rem)]">
              <Fade>
                <Outlet />
              </Fade>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

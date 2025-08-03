/** @format */

import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import Swal from "sweetalert2";
import {
  RiLogoutBoxRLine,
  RiVipCrownLine,
  RiHome9Line,
  RiFolderUploadLine,
  RiArrowLeftSLine,
  RiBookletLine,
  RiBarChartBoxLine,
  RiGraduationCapFill,
} from "react-icons/ri";
import { removeAuthTokens } from "../lib/cookie-utils";
import useLoggedUser from "../components/hook/useLoggedUser";
import { FaSignInAlt, FaUsers } from "react-icons/fa";
import { User } from "lucide-react";

const Dashboard = () => {
  const { user } = useLoggedUser([]);
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "No, Cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeAuthTokens();
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("pendingSignupData");

        navigate("/signin");
      }
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const iconMappings = {
    Upgrade: RiVipCrownLine,
    Book: RiFolderUploadLine,
    Home: RiHome9Line,
    Assignment: RiBookletLine,
    Teachers: FaUsers, // Assuming Teachers is a component that renders the Teachers page
    Analytics: RiBarChartBoxLine,
    Essays: RiGraduationCapFill,
  };

  const Menus = [
    {
      title: "Home",
      path: "/",
      icon: iconMappings.Home,
      role: "user",
      gap: true,
    },
    {
      title: "Analytics",
      path: "/analytics",
      icon: iconMappings.Analytics,
      role: "teacher",
    },
    {
      title: "Upload Essay",
      path: "/upload_essay",
      icon: iconMappings.Book,
      role: "student",
    },
    {
      title: "Compare Essay",
      path: "/compare_essay",
      icon: iconMappings.Book,
      role: "student",
    },
    {
      title: "Assignment",
      path: "/assignment",
      icon: iconMappings.Assignment,
      role: "user",
    },
    {
      title: "Essays",
      path: "/essays",
      icon: iconMappings.Essays,
      role: "teacher",
    },
    {
      title: "Teachers",
      path: "/teachers",
      icon: iconMappings.Teachers,
      role: "student",
    },
    {
      title: "Students",
      path: "/students",
      icon: iconMappings.Teachers,
      role: "teacher",
    },
    {
      title: "Upgrade",
      path: "/upgrade",
      icon: iconMappings.Upgrade,
      role: "user",
    },
  ];

  const userMenus = Menus.filter(
    (menu) => menu.role === "user" || menu.role === user?.role
  );
  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={` ${
          open ? "w-52 p-4" : "w-14 text-center"
        } h-screen bg-base-300 fixed left-0 top-0 bottom-0 z-50 pt-8 transition-all duration-500`}
      >
        <RiArrowLeftSLine
          className={`absolute cursor-pointer -right-3 text-gray-400 bg-base-300 shadow-md top-9 w-7 h-7 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex items-center gap-x-4 p-2">
          {/* <img
            src="/your-logo.png"
            alt="logo"
            className={`cursor-pointer w-full md:w-9/12 p-1 duration-500`}
          /> */}
          <h1 className="md:text-2xl ps-3 font-bold">Logo</h1>
        </div>

        <ul
          className={`${
            open ? "" : "flex flex-col items-center justify-center"
          }`}
        >
          {userMenus.map((Menu, index) => (
            <Link
              to={Menu.path}
              key={index}
              className={`flex rounded-full py-1.5 px-4 cursor-pointer text-sm items-center ${
                Menu.gap ? "mt-9" : "mt-2"
              } ${
                location.pathname === Menu.path
                  ? "bg-[#1E2839] text-white"
                  : "hover:bg-white"
              }`} // Add active class
            >
              <li className="flex items-center gap-x-2 text-md ">
                <IconContext.Provider value={{ className: "react-icon" }}>
                  <Menu.icon className="text-lg" />
                </IconContext.Provider>
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>

        {/* Profile + Logout */}
        <div className="mt-28 ms-3.5 md:ms-0 bottom-20 absolute w-full">
          {user ? (
            <>
              <Link
                to="/profile"
                className={`-ml-3.5 flex p-2 pl-4.5 cursor-pointer text-sm items-center w-full ${
                  location.pathname === "/profile"
                    ? "bg-white"
                    : "hover:bg-white"
                }`}
              >
                <li className="flex items-center gap-x-4 w-full">
                  <User className="text-xl" />
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Profile
                  </span>
                </li>
              </Link>
              <button
                onClick={handleLogout}
                className="flex text-red-400 mt-5 p-1 text-sm items-center cursor-pointer w-full"
              >
                <li className="flex items-center gap-x-4 w-full">
                  <RiLogoutBoxRLine className="text-xl" />
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Logout
                  </span>
                </li>
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="flex items-center -ms-4  w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 transition duration-300"
            >
              <li className="flex items-center justify-center gap-x-3 w-full">
                <FaSignInAlt className="w-5 h-5" /> {/* Login Icon */}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Log in
                </span>
              </li>
            </Link>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={` ${
          open ? "pl-60" : "pl-14 pr-2"
        } flex-1 overflow-y-auto transition-all duration-500 h-[100vh] p-10`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

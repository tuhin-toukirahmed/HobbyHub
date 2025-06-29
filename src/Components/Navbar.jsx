import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../Provider/useAuth";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";

const Navbar = () => {
  const { logOut, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout",
      text: "Are you sure you want to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await logOut();

        await Swal.fire({
          title: "Success!",
          text: "You have been logged out successfully.",
          icon: "success",
          confirmButtonColor: "#059669",
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/");
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: "Logout failed: " + (err.message || "Unknown error"),
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
      }
    }
  };

  const navbarRef = useRef(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="relative">
      {" "}
      <div
        ref={navbarRef}
        className={`navbar bg-light-bg sm:max-w-xl md:max-w-full lg:max-w-screen-xl mx-auto fixed left-1/2 top-0 z-50 transform -translate-x-1/2 w-full max-w-4xl transition-transform duration-300  glass rounded-xl ${
          visible ? "translate-y-0" : "-translate-y-full"
        } `}
      >
        {" "}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content dark:bg-dark-bg light:bg-light-bg rounded-box z-1 mt-3 w-52 p-2 border shadow"
            >
              <li className={isActive("/") ? "font-bold text-blue-600  " : ""}>
                <Link to="/">Home</Link>
              </li>
              <li
                className={
                  isActive("/dashboard") ? "font-bold text-blue-600  " : ""
                }
              >
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li
                className={
                  isActive("/all-groups") ? "font-bold text-blue-600  " : ""
                }
              >
                <Link to="/all-groups">Groups</Link>
              </li>{" "}
              {user && (
                <li
                  className={
                    isActive("/profile") ? "font-bold text-blue-600  " : ""
                  }
                >
                  <Link to="/profile">Profile</Link>
                </li>
              )}
              {user && (
                <li
                  className={
                    isActive("/settings") ? "font-bold text-blue-600  " : ""
                  }
                >
                  <Link to="/settings">Settings</Link>
                </li>
              )}
              {user ? (
                <li>
                  <button onClick={handleLogout} className="text-red-500  ">
                    Logout
                  </button>
                </li>
              ) : (
                <li
                  className={
                    isActive("/login") ? "font-bold text-blue-600  " : ""
                  }
                >
                  <Link to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
          <Link to="/" className="text-xl">
            <span className="flex space-x-1">
              <svg
                className="w-6 text-deep-purple-accent-400"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                stroke="currentColor"
                fill="none"
              >
                <rect x="3" y="1" width="7" height="12"></rect>
                <rect x="3" y="17" width="7" height="6"></rect>
                <rect x="14" y="1" width="7" height="6"></rect>
                <rect x="14" y="11" width="7" height="12"></rect>
              </svg>
              <h1 className="font-heading">HobbyHub</h1>
            </span>
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          {" "}
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                to="/"
                className={
                  isActive("/")
                    ? "font-bold text-blue-600 border-b-2 border-blue-500"
                    : ""
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className={
                  isActive("/dashboard")
                    ? "font-bold text-blue-600 border-b-2 border-blue-500"
                    : ""
                }
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/all-groups"
                className={
                  isActive("/all-groups")
                    ? "font-bold text-blue-600 border-b-2 border-blue-500"
                    : ""
                }
              >
                Groups
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  to="/profile"
                  className={
                    isActive("/profile")
                      ? "font-bold text-blue-600 border-b-2 border-blue-500"
                      : ""
                  }
                >
                  Profile
                </Link>
              </li>
            )}{" "}
            <li>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="avatar"
                  data-tooltip-id="user-tooltip"
                  data-tooltip-content={
                    user?.displayName || user?.email || "User Profile"
                  }
                >
                  <div className="w-8 rounded-full ring ring-offset-1">
                    <img
                      alt="User profile"
                      src={
                        user?.photoURL ||
                        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                      }
                    />
                  </div>
                </div>
                <Tooltip id="user-tooltip" place="bottom" />
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content backdrop-blur-sm rounded-box z-1 mt-3 w-52 p-2 border shadow glass"
                >
                  {user ? (
                    <>
                      <li className="border-b-1 border-gray-300 py-1">
                        <Link
                          to="/settings"
                          className={` ${
                            isActive("/settings")
                              ? "font-bold text-blue-600 border-b-2 border-blue-500"
                              : ""
                          }`}
                        >
                          Settings & Accounts
                        </Link>
                      </li>
                      <li>
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                  )}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

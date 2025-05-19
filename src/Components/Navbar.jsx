import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-light-bg  shadow-sm md:px-10   mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
              <div className="dropdown-content">
                <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/all-groups">Groups</Link>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/settings">Settings</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Link to="/" className="text-xl">
            <h1 className="font-heading text-dark-text">HobbyHub</h1>
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/all-groups">Groups</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;

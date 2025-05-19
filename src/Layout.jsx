import React from "react";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router";
import Footer from "./Components/Footer";
import ToggleTheme from "./Components/ToggleTheme";

const Layout = () => {
  return (
    <div className=" relative min-h-screen bg-light-bg dark:bg-dark-bg">
      <Navbar />
      <div className="flex justify-end p-2 absolute bottom-0 left-0">
        <ToggleTheme />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;

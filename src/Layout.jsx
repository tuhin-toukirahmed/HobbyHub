import React from "react";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router";
import Footer from "./Components/Footer";
import ToggleTheme from "./Components/ToggleTheme";

const Layout = () => {
  return (
    <div className=" relative min-h-screen bg-light-bg dark:bg-dark-bg">
      <Navbar />
      <div className="p-2  fixed bottom-0 left-0 z-10">
        <ToggleTheme />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;

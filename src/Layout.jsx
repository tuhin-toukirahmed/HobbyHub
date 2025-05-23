import React from "react";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router";
import Footer from "./Components/Footer";
import ToggleTheme from "./Components/ToggleTheme";

const Layout = () => {  return (
    <div className="relative min-h-screen bg-light-bg dark:bg-dark-bg flex flex-col">
      <Navbar />
      <div className="p-2 fixed bottom-0 left-0 z-50">
        <ToggleTheme />
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
      {/* Render Footer on all pages with proper z-index */}
      <Footer />
    </div>
  );
};

export default Layout;

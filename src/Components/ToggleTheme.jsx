import React from "react";
import { useTheme } from "../theme-context";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="relative inline-block">
      <button 
        className={`p-2 rounded-full transition-all duration-300 shadow-md ${
          theme === "light" 
            ? "bg-light-card text-gray-800 hover:bg-gray-200"
            : "bg-dark-surface text-yellow-300 hover:bg-gray-700"
        }`}
        onClick={toggleTheme} 
        aria-label="Toggle theme"
      >
        <span className="text-lg">
          {theme === "light" ? "🌙" : "☀️"}
        </span>
        <span className="sr-only">{theme === "light" ? "Switch to dark mode" : "Switch to light mode"}</span>
      </button>
    </div>
  );
};

export default ToggleTheme;

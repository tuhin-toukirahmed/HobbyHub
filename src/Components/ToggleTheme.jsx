import React from "react";
import { useTheme } from "../theme-context";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <button className="btn" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === "light" ? "🌙 " : "☀️ "}
      </button>
    </div>
  );
};

export default ToggleTheme;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import router from "./Routes/Routes";
import { ThemeProvider } from "./theme-context";
import { AuthProvider } from "./Provider/AuthProvider.jsx";
import { DataProvider } from "./Provider/Dataprovider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <RouterProvider router={router} />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);

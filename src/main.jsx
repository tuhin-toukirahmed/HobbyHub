import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Routes/Routes";
// import { ThemeProvider } from "./theme-context";
import { AuthProvider } from "./Provider/AuthProvider.jsx";
import { DataProvider } from "./Provider/Dataprovider.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </AuthProvider>
  );
}

function AppWithToaster() {
  return (
    <>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWithToaster />
  </StrictMode>
);

// Export App for fast refresh
export default App;

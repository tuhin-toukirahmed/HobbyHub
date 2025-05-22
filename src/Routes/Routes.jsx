import { createBrowserRouter } from "react-router";
import Home from "./../Pages/Home";
import Allgroups from "./../Pages/Allgroups";
import Mygroups from "./../Pages/Mygroups";
import Creategroup from "./../Pages/Creategroup";
import UpdateGroup from "./../Pages/UpdateGroup";
import Layout from "./../Layout";
import ErrorPage from "./../Pages/ErrorPage";
import Profile from "../Pages/Profile";
import Settings from "../Pages/Settings";
import DashBoard from "../Pages/DashBoard";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import GroupDetails from "../Pages/GroupDetails";
import MyGroupDetails from "../Pages/MyGroupDetails";
import ProtectedRoute from "../Components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-groups",
        element: <Allgroups />,
      },      {
        path: "/my-groups",
        element: <ProtectedRoute><Mygroups /></ProtectedRoute>,
      },
      {
        path: "/create-group",
        element: <ProtectedRoute><Creategroup /></ProtectedRoute>,
      },
      {
        path: "/update-group/:groupId",
        element: <ProtectedRoute><UpdateGroup /></ProtectedRoute>,
      },
      {
        path: "/profile",
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
      },
      {
        path: "/settings",
        element: <ProtectedRoute><Settings /></ProtectedRoute>,
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute><DashBoard /></ProtectedRoute>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/group/:groupName",
        element:<ProtectedRoute><GroupDetails /></ProtectedRoute>,
      },
         {
        path: "/my-group-details/:groupId",
        element: <ProtectedRoute><MyGroupDetails /></ProtectedRoute>,
      }
    ],
  },
]);
export default router;

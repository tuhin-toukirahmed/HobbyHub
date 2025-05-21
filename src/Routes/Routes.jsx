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
      },
      {
        path: "/my-groups",
        element: <Mygroups />,
      },
      {
        path: "/create-group",
        element: <Creategroup />,
      },
      {
        path: "/update-group",
        element: <UpdateGroup />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
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
        element: <GroupDetails />,
      },
       
      {
        path: "/my-group-details/:groupId",
        element: <MyGroupDetails />,
      }
    ],
  },
]);
export default router;

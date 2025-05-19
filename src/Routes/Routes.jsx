import { createBrowserRouter } from "react-router";
import Home from "./../Pages/Home";
import Allgroups from "./../Pages/Allgroups";
import Mygroups from "./../Pages/Mygroups";
import Creategroup from "./../Pages/Creategroup";
import UpdateGroup from "./../Pages/UpdateGroup";
import Layout from "./../Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
    ],
  },
]);
export default router;

import { createBrowserRouter } from "react-router";
import Dashboard from "../Layouts/Dashboard";
import Signup from "../Pages/Authentication/Signup";
import SignIn from "../Pages/Authentication/SignIn";
import ProfilePage from "../Pages/Authentication/Profile/ProfilePage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/profile",
        element: <ProfilePage/>
      }

    ],
  },
  
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;

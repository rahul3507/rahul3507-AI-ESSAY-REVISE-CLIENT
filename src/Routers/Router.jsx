import { createBrowserRouter } from "react-router";
import Dashboard from "../Layouts/Dashboard";
import Signup from "../Pages/Authentication/Signup";
import SignIn from "../Pages/Authentication/SignIn";
import OtpVerification from "../Pages/Authentication/OtpVerification";
import ProfilePage from "../Pages/Authentication/Profile/ProfilePage";
import HomePage from "../Pages/Dashboard/HomePage/HomePage";
import UploadEssay from "../Pages/Dashboard/UploadEssay/UploadEssay";
import Upgrade from "../Pages/Dashboard/Upgrade/Upgrade";
import UploadOneFile from "../Pages/Dashboard/HomePage/UploadOneFile";
import UploadComparison from "../Pages/Dashboard/UploadEssay/UploadComparison";
import ComparisonResult from "../Pages/Dashboard/UploadEssay/ComparisonResult";
import PaymentSuccess from "../Pages/Dashboard/Upgrade/PaymentSuccess";
import PaymentFail from "../Pages/Dashboard/Upgrade/PaymentFail";
import PaymentCancel from "../Pages/Dashboard/Upgrade/PaymentCancel";
import ProtectedRoute from "./ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: 
        <Dashboard />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/upload_one",
        element: <UploadOneFile />,
      },
      {
        path: "/upload_essay",
        element: <UploadEssay />,
      },
      {
        path: "/upload_comparison",
        element: <UploadComparison />,
      },
      {
        path: "/result",
        element: <ComparisonResult />,
      },
      {
        path: "/upgrade",
        element: <Upgrade />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },

  {
    path: "/payment/success",
    element: <PaymentSuccess />,
  },
  {
    path: "/payment/cancel",
    element: <PaymentCancel />,
  },
  {
    path: "/payment/failed",
    element: <PaymentFail />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/otp",
    element: <OtpVerification />,
  },
]);

export default router;

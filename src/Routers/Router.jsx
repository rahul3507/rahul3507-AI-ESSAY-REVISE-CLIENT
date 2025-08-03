/** @format */

import { createBrowserRouter } from "react-router";
import Dashboard from "../Layouts/Dashboard";
import Signup from "../Pages/Authentication/Signup";
import SignIn from "../Pages/Authentication/SignIn";
import OtpVerification from "../Pages/Authentication/OtpVerification";
import ProfilePage from "../Pages/Authentication/Profile/ProfilePage";
import HomePage from "../Pages/Dashboard/HomePage/HomePage";
import UploadEssay from "../Pages/Dashboard/UploadEssay/UploadEssay";
import CompareEssay from "../Pages/Dashboard/CompareEssay/CompareEssay";
import Upgrade from "../Pages/Dashboard/Upgrade/Upgrade";
import UploadOneFile from "../Pages/Dashboard/UploadEssay/UploadOneFile";
import UploadComparison from "../Pages/Dashboard/CompareEssay/UploadComparison";
import ComparisonResult from "../Pages/Dashboard/CompareEssay/ComparisonResult";
import PaymentSuccess from "../Pages/Dashboard/Upgrade/PaymentSuccess";
import PaymentFail from "../Pages/Dashboard/Upgrade/PaymentFail";
import PaymentCancel from "../Pages/Dashboard/Upgrade/PaymentCancel";
import ProtectedRoute from "./ProtectedRoute";
import TermsAndConditions from "../Pages/Authentication/TermsAndConditions";
import Assignment from "../Pages/Dashboard/Assignment/Assignment";
import Teachers from "../Pages/Dashboard/Teachers/Teachers";
import Analytics from "../Pages/Dashboard/Analytics/Analytics";
import Essays from "../Pages/Dashboard/Essays/Essays";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
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
        path: "/compare_essay",
        element: <CompareEssay />,
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
        path: "/assignment",
        element: <Assignment />,
      },
      {
        path: "/essays",
        element: <Essays />,
      },
      {
        path: "/teachers",
        element: <Teachers />,
      },
      {
        path: "/upgrade",
        element: <Upgrade />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
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
  {
    path: "/terms",
    element: <TermsAndConditions />,
  },
]);

export default router;

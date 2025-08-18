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
import EssayResult from "../Pages/Dashboard/UploadEssay/EssayResult";
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
import Students from "../Pages/Dashboard/Students/Students";
import AssignmentTable from "../Pages/Dashboard/Assignment/TeacherAssignment/AssignmentTable";
import AssignmentResult from "../Pages/Dashboard/Assignment/TeacherAssignment/AssignmentResult";
import TeachersFeedback from "../Pages/Dashboard/HomePage/TeacherHome/TeacherFeedback";
import ForgetPassEmail from "../Pages/Authentication/ForgetPassEmail";
import ResetOtpVerification from "../Pages/Authentication/ResetOtpVerification";

import ResetPassword from "../Pages/Authentication/ResetPassword";

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
        path: "/essay_result/:essayId",
        element: <EssayResult />,
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
        path: "/assignment/submitted-assignments/:id",
        element: <AssignmentTable />,
      },
      {
        path: "/assignment/submitted-assignments/assignment-result/:id",
        element: <AssignmentResult />,
      },
      {
        path: "/essays",
        element: <Essays />,
      },
      {
        path: "/essays/feedback/:id/",
        element: <TeachersFeedback />,
      },
      {
        path: "/teachers",
        element: <Teachers />,
      },
      {
        path: "/students",
        element: <Students />,
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
    path: "/reset_otp",
    element: <ResetOtpVerification />,
  },
  {
    path: "/reset_password",
    element: <ResetPassword />,
  },

  {
    path: "/terms",
    element: <TermsAndConditions />,
  },
  {
    path: "/forget_password",
    element: <ForgetPassEmail />,
  },
]);

export default router;

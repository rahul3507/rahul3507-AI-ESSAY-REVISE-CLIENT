import { Navigate } from "react-router-dom";
import useLoggedUser from "../components/hook/useLoggedUser";
import Dashboard from "../Layouts/Dashboard";
import LoadingSpinner from "../components/LoadingSpinner";

const ProtectedRoute = () => {
  const { user, loading } = useLoggedUser();

  if (loading) {
    return <LoadingSpinner/>;
  }

  // Ensure not just falsy, but also not an empty object
  if (!user || Object.keys(user).length === 0) {
    return <Navigate to="/signin" replace />;
  }

  return <Dashboard />;
};

export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";
import useLoggedUser from "../components/hook/useLoggedUser";

const ProtectedRoute = () => {
  const { user, loading } = useLoggedUser();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

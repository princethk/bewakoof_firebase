import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import LoadingComponent from "./loading-component";

/**
 * Component to require authentication before rendering child routes
 * @returns {JSX.Element} RequireAuth component JSX
 */
function RequireAuth() {
  const {
    auth: { isAuthenticated },
    loading,
  } = useAuth();

  // Display loading component while authentication status is being checked
  if (loading) return <LoadingComponent />;

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) return <Navigate to={"/login"} />;

  // Render child routes if user is authenticated
  return <Outlet />;
}

export default RequireAuth;

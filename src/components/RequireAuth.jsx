import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/auth/useAuth";
import { Error } from "../pages/Error/index";
import useLogout from "../hooks/auth/useLogout";
import { jwtDecode } from "jwt-decode";

// Component to require authentication based on allowed roles
export const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const logout = useLogout(location);
  
  // Decode JWT to extract roles
  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
  const roles = decoded?.Role || "";

  // Logout if no access token is present
  if (!auth?.accessToken) {
    logout();
  }

  // Render child components if user's roles are allowed, otherwise show 403 error
  return allowedRoles?.includes(roles) ? (
    <Outlet />
  ) : (
    auth?.username && <Error code="403" />
  );
};

//check that user is not authenticated
export const RequireNotAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  
  //Redirect to home page if user is authenticated, otherwise render child components
  return auth?.username ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

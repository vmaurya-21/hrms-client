import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "../../lib/axios";

/**
 * Custom hook to handle logout functionality.
 * @param {Object} location - Optional location object from React Router indicating where the user came from.
 * @returns {Function} - Logout function to be called when the user initiates logout.
 */
const useLogout = (location) => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  return async () => {
    // Sending a request to the server to logout the user
    await axios("/user/logout", {}).catch(() => {});

    // Clearing authentication state in the application
    setAuth({});

    // Navigating the user to the login page after logout
    if (location) {
      navigate("/login", { state: { from: location }, replace: true });
    } else {
      navigate("/login");
    }
  };
};

export default useLogout;

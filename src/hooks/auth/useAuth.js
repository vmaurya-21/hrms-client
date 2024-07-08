import { useContext } from "react";
import AuthContext from "../../contexts/AuthProvider";

/**
 * Custom hook to access authentication context.
 * Returns the current value of the AuthContext using useContext.
 */
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;

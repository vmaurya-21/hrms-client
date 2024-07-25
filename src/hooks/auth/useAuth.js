import { useContext } from "react";
import AuthContext from "../../contexts/AuthProvider";

/**
 * @namespace hooks
 */

/**
 * Custom hook to access authentication context.
 *
 * This hook provides a way to access the current authentication context value.
 * It uses the `useContext` hook to get the value from `AuthContext`.
 *
 * @memberof hooks
 * @returns {Object} The current value of the AuthContext, including authentication state and functions to update it.
 *
 * @example
 * // Example usage:
 * const { auth, setAuth, setPersist } = useAuth();
 *
 * @see {@link AuthContext} For the context provided by `AuthProvider`.
 */
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;

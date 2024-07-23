import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

/**
 * Provider component for managing authentication state and context.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {React.ReactNode} props.children - The children components that will have access to the authentication context.
 *
 * @example
 * // Example usage:
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 *
 * @returns {JSX.Element} The provider component that wraps children with authentication context.
 */
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const storedState = localStorage.getItem("authState");
    return storedState
      ? (() => {
          try {
            return JSON.parse(storedState);
          } catch (e) {
            return { auth: {}, persist: false };
          }
        })()
      : { auth: {}, persist: false };
  });

  // Effect to update localStorage whenever authState changes
  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(authState));
  }, [authState]);

  /**
   * Function to update authentication data in authState.
   * @param {Object} auth - The authentication data.
   */
  const setAuth = (auth) => {
    setAuthState((prevState) => ({ ...prevState, auth }));
  };

  /**
   * Function to update persistence setting in authState.
   * @param {boolean} persist - The persistence setting.
   */
  const setPersist = (persist) => {
    setAuthState((prevState) => ({ ...prevState, persist }));
  };

  // Providing authState, setAuth, and setPersist to child components via context
  return (
    <AuthContext.Provider value={{ ...authState, setAuth, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

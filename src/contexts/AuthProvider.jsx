import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

// Provider component for managing authentication state and context
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const storedState = localStorage.getItem("authState");
    return storedState ? JSON.parse(storedState) : { auth: {}, persist: false };
  });

  // Effect to update localStorage whenever authState changes
  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(authState));
  }, [authState]);

  // Function to update authentication data in authState
  const setAuth = (auth) => {
    setAuthState((prevState) => ({ ...prevState, auth }));
  };

  // Function to update persistence setting in authState
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

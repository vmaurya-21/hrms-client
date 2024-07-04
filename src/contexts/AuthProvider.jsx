import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const storedState = localStorage.getItem("authState");
    return storedState ? JSON.parse(storedState) : { auth: {}, persist: false };
  });

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(authState));
  }, [authState]);

  const setAuth = (auth) => {
    setAuthState((prevState) => ({ ...prevState, auth }));
  };

  const setPersist = (persist) => {
    setAuthState((prevState) => ({ ...prevState, persist }));
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuth, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

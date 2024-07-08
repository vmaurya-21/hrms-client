import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/auth/useRefreshToken";
import useAuth from "../hooks/auth/useAuth";

// Component to handle persistent login state
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken(); // Refresh token function from custom hook
  const { auth, persist } = useAuth(); // Authentication state and persist flag from custom hook

  useEffect(() => {
    let isMounted = true;

    // Function to check and refresh token
    const checkRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setIsLoading(false); // Set loading state to false when done, if component is still mounted
      }
    };

    // Check conditions for token refresh on component mount or state change
    if (!auth?.accessToken && persist) {
      checkRefreshToken(); // If no access token and persist flag is true, initiate token refresh
    } else {
      setIsLoading(false); // Otherwise, set loading state to false
    }

    // Cleanup function to set mounted flag to false when component unmounts
    return () => {
      isMounted = false;
    };
  }, [auth?.accessToken, persist, refresh]);

  return (
    <>
      {/* Conditional rendering based on persist flag and loading state */}
      {!persist ? (
        <Outlet /> // Render child routes if persist flag is false
      ) : isLoading ? (
        <h2 className="container">Loading...</h2>
      ) : (
        <Outlet /> // Render child routes once loading is complete
      )}
    </>
  );
};

export default PersistLogin;

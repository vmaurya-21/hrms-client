import { axiosPrivate } from "../../lib/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

/**
 * Custom hook to handle Axios instance with private routes and token refresh logic.
 *
 * This hook configures the Axios instance to include the access token in request headers
 * and handle token refresh when a 401 Unauthorized error occurs.
 *
 * @returns {AxiosInstance} The configured Axios instance for private routes.
 *
 * @example
 * // Example usage:
 * const axiosInstance = useAuthAxios();
 * axiosInstance.get('/protected-route');
 */
const useAuthAxios = () => {
  const refresh = useRefreshToken(); // Function to refresh the access token
  const { auth } = useAuth(); // Accessing authentication details from the context

  useEffect(() => {
    // Adding interceptors for request and response
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        // Adding Authorization header if not present
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error) // Forwarding any request errors
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        // If token expired and request is not retried
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true; // Marking the request as sent
          const newAccessToken = await refresh(); // Refreshing the access token
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`; // Updating the header with new token
          return axiosPrivate(prevRequest); // Retrying the request with new token
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function to remove interceptors
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]); // Effect dependencies on auth and refresh

  return axiosPrivate;
};

export default useAuthAxios;

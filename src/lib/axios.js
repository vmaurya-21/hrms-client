import axios from "axios";

// Getting the base URL for API from environment variables
const baseURL = import.meta.env.VITE_API_URL;

/**
 * Default axios instance configured with the base URL.
 * This instance can be used for public API calls that don't require authentication.
 */
export default axios.create({ baseURL });

/**
 * Axios instance for private API calls.
 * This instance is configured with:
 * - Base URL from environment variables
 * - JSON Content-Type header for request bodies
 * - withCredentials flag to include cookies in requests (useful for authentication)
 */
export const axiosPrivate = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

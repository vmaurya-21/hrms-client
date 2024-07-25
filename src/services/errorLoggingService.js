import axios from "../lib/axios";
import { endpoints } from "../constants/urls";

/**
 * @namespace services
 */
/**
 * Logs an error to an external service.
 * @memberof services
 * @async
 * @function
 * @param {Error} error - The error object to be logged.
 * @param {Object} [info] - Additional info about the error context.
 * @param {string} [info.componentStack] - The stack trace of the component where the error occurred (for React components).
 *
 * @example
 * try {
 *   // Code that may throw an error
 * } catch (error) {
 *   logErrorToService(error, { componentStack: 'Component stack trace' });
 * }
 */
export const logErrorToService = async (error, info) => {
  const { ERROR_API } = endpoints;
  try {
    await axios.post(
      ERROR_API,
      {
        error: error.message, // The error message
        stack: error.stack, // The stack trace of the error
        info: info.componentStack, // Component stack (for React components)
        timestamp: new Date().toISOString(), // Current timestamp
      },
      {
        headers: { "Content-Type": "application/json" }, // Set Content-Type to JSON
        withCredentials: true, // Include credentials (cookies) if needed
      }
    );
  } catch (err) {
    // Log any errors that occur while making the request
    console.error("Error logging failed:", err);
  }
};

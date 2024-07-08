import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/**
 * Error component to display different error messages and navigation options.
 * @param {Object} props - Props for error handling.
 * @param {string} props.code - Error code ("404" or "403").
 */
export const Error = (props) => {
  const navigate = useNavigate(); // Hook from react-router-dom for navigation
  const goBack = () => navigate(-1); // Function to navigate back in history

  // Determine error message based on props.code
  let message, subMessage;
  if (props.code === "404") {
    message = "Page not found.";
    subMessage =
      "The page you're looking for may have been moved, deleted, or has never existed.";
  } else if (props.code === "403") {
    message = "Forbidden.";
    subMessage = "You do not have access to this page.";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-8 rounded shadow-md">
        <h1 className="text-6xl font-bold text-red-500 mb-4">{props.code}</h1>
        <h2 className="text-2xl font-semibold mb-2">
          {message || "Something went wrong"} {/* Display main error message */}
        </h2>
        <p className="text-gray-600 mb-4">
          {subMessage ||
            "An error has occurred, maybe you did something wrong?"}{" "}
          {/* Display sub-message */}
        </p>

        <div className="space-y-2">
          <Link
            to="/"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mx-2"
          >
            Back to home {/* Link to navigate to home page */}
          </Link>
          {props.code === "403" && (
            <button
              onClick={goBack}
              className="inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Go back {/* Button to navigate back in history */}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

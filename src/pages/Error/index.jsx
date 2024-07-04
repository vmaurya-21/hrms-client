import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Error = (props) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  let message, subMessage;
  if (props.code === "404") {
    message = "Page not found.";
    subMessage =
      "The page you're looking for may have been moved, deleted or has never existed.";
  } else if (props.code === "403") {
    message = "Forbidden.";
    subMessage = "You do not have access to this page.";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-8 rounded shadow-md">
        <h1 className="text-6xl font-bold text-red-500 mb-4">{props.code}</h1>
        <h2 className="text-2xl font-semibold mb-2">
          {message || "Something went wrong"}
        </h2>
        <p className="text-gray-600 mb-4">
          {subMessage ||
            "An error has occurred, maybe you did something wrong?"}
        </p>

        <div className="space-y-2">
          <Link
            to="/"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mx-2"
          >
            Back to home
          </Link>
          {props.code === "403" && (
            <button
              onClick={goBack}
              className="inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Go back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

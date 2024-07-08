import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../lib/axios";
import useAuth from "../../hooks/auth/useAuth";

export const Login = () => {
  const { persist, setAuth, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const redirection = location.state?.from?.pathname || "/"; // Redirect user to previous page after login

  const usernameOrEmailRef = useRef(); // Ref for username/email input field
  const errRef = useRef(); // Ref for error message element

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // Focus username/email input on initial render
  useEffect(() => {
    usernameOrEmailRef.current.focus();
  }, []);

  // Clear error message when username/email or password changes
  useEffect(() => {
    setErrMsg("");
  }, [usernameOrEmail, password]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to server
      const response = await axios.post(
        "/user/login",
        JSON.stringify({ usernameOrEmail, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Include cookies for authentication
        }
      );

      // Handle invalid response from server
      if (!response.data) {
        throw new Error("Invalid response from server");
      }

      // Destructure response data
      const { accessToken, username, email } = response.data;

      // Update authentication context with user information
      setAuth({ username, email, accessToken });

      // Clear username/email and password fields
      setUsernameOrEmail("");
      setPassword("");

      // Redirect user to previous page or home ("/") after successful login
      navigate(redirection, { replace: true });
    } catch (err) {
      // Handle errors
      if (!err?.response) {
        setErrMsg("The server didn't respond."); // Server did not respond
      } else if ([400, 401].includes(err.response?.status)) {
        setErrMsg(err.response?.data?.message); // Display error message from server
      } else {
        setErrMsg("Login failed."); // Other login failure
      }

      // Clear error message after 4 seconds
      setTimeout(() => {
        setErrMsg("");
      }, 4000);

      // Focus on error message
      errRef.current.focus();
    }
  };

  // Toggle persistent login checkbox
  const togglePersist = () => {
    setPersist(!persist);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-3xl font-bold text-center">Login</h1>
          {/* Display error message */}
          <p
            ref={errRef}
            className={`${errMsg ? "text-red-600" : "hidden"} text-center`}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          {/* Username/email input */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2">
            <input
              type="text"
              id="usernameOrEmail"
              ref={usernameOrEmailRef}
              autoComplete="off"
              placeholder="Your username or email"
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              value={usernameOrEmail}
              required
              className="w-full outline-none"
            />
          </div>

          {/* Password input */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2">
            <input
              type="password"
              id="password"
              placeholder="Your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="w-full outline-none"
            />
          </div>

          {/* Persistent login checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="persist_checkBox"
              onChange={togglePersist}
              checked={persist}
              className="mr-2"
            />
            <label htmlFor="persist_checkBox" className="text-gray-600">
              Remember me
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            disabled={!usernameOrEmail || !password}
          >
            Sign in
          </button>
        </form>

        {/* Link to register */}
        <div className="text-center mt-4">
          {"You don't have an account? "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

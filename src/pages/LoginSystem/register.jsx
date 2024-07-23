import { useRef, useState, useEffect } from "react";
import axios from "../../lib/axios";
import { endpoints } from "../../constants/urls";

// Regular expressions for validation
const userRegex = /^[A-z][A-z0-9-_]{3,18}$/; // Username validation
const emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // Email validation
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!*@#$%]).{8,24}$/; // Password validation

/**
 * Register component for user registration.
 *
 * This component provides a user interface for creating a new account. It includes fields for username,
 * email, password, and password confirmation. It validates the inputs using regular expressions and provides
 * feedback on input validity. On successful registration, it displays a success message.
 * Handles form submission and displays error messages if the registration fails.
 *
 * @component
 * @example
 * return (
 *   <Register />
 * )
 */
export const Register = () => {
  const usernameRef = useRef(); // Ref for username input field
  const errRef = useRef(); // Ref for error message element
  const { REGISTER_API } = endpoints;

  // State variables for managing form inputs and validation
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState(""); // State for error message
  const [success, setSuccess] = useState(false); // State for success message

  // Focus on username input field on initial render
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  // Validate username format whenever it changes
  useEffect(() => {
    setValidUsername(userRegex.test(username));
  }, [username]);

  // Validate email format whenever it changes
  useEffect(() => {
    setValidEmail(emailRegex.test(email));
  }, [email]);

  // Validate password format and match password whenever they change
  useEffect(() => {
    setValidPassword(passwordRegex.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  // Clear error message whenever username, password, or match password changes
  useEffect(() => {
    setErrMsg("");
  }, [username, password, matchPassword]);

  /**
   * Handles the form submission event.
   *
   * This function prevents the default form submission behavior, validates the form inputs, sends a registration
   * request to the server, and handles success and error responses. On successful registration, it updates
   * state to reflect success and clears the form inputs. Handles various error scenarios including server errors
   * and conflict errors.
   *
   * @param {Object} e - The event object from the form submission.
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate username and password format before submitting
    if (!userRegex.test(username) || !passwordRegex.test(password)) {
      return setErrMsg("Invalid Entry");
    }

    try {
      // Send registration request to server
      await axios.post(
        REGISTER_API,
        JSON.stringify({ username, email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Include cookies for authentication
        }
      );

      // Update state upon successful registration
      setSuccess(true);
      setUsername("");
      setEmail("");
      setPassword("");
      setMatchPassword("");
    } catch (err) {
      // Handle errors from server response
      if (!err?.response) {
        setErrMsg("The server didn't respond.");
        setTimeout(() => {
          setErrMsg("");
        }, 4000); // Clear error message after 4 seconds
      } else if (err.response?.status === 409) {
        setErrMsg(err.response?.data?.message); // Display conflict error message from server
        setTimeout(() => {
          setErrMsg("");
        }, 4000); // Clear error message after 4 seconds
      } else {
        setErrMsg("Registration failed.");
        setTimeout(() => {
          setErrMsg("");
        }, 4000); // Clear error message after 4 seconds
      }
      errRef.current.focus(); // Focus on error message
    }
  };

  // JSX structure for rendering the Register component
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {success ? (
        <h2 className="text-3xl font-bold text-center text-green-500">
          Success! Now, log in
        </h2>
      ) : (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-3xl font-bold text-center">Register</h1>
            <p
              ref={errRef}
              className={`${errMsg ? "text-red-600" : "hidden"} text-center`}
              aria-live="assertive"
            >
              {errMsg}
            </p>

            {/* Username input */}
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <input
                type="text"
                id="username"
                ref={usernameRef}
                autoComplete="off"
                placeholder="Enter a username"
                onChange={(e) => setUsername(e.target.value)}
                required
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
                aria-invalid={validUsername ? "false" : "true"}
                aria-describedby="uidnote"
                className="w-full outline-none"
              />
            </div>
            {/* Username validation message */}
            <p
              id="uidnote"
              className={`${usernameFocus && username && !validUsername ? "text-red-600 text-sm mt-2" : "hidden"}`}
            >
              4 to 24 characters (must begin with a letter).
              <br />
              Letters, numbers, underscores, or hyphens.
            </p>

            {/* Email input */}
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <input
                type="email"
                id="email"
                autoComplete="off"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                className="w-full outline-none"
              />
            </div>
            {/* Email validation message */}
            <p
              id="emailnote"
              data-testid="emailnote"
              className={`${emailFocus && email && !validEmail ? "text-red-600 text-sm mt-2" : "hidden"}`}
            >
              Must be a valid email.
            </p>

            {/* Password input */}
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <input
                type="password"
                id="password"
                placeholder="Enter a password"
                onChange={(e) => setPassword(e.target.value)}
                required
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="pwdnote"
                className="w-full outline-none"
              />
            </div>
            {/* Password validation message */}
            <p
              id="pwdnote"
              className={`${passwordFocus && !validPassword ? "text-red-600 text-sm mt-2" : "hidden"}`}
            >
              8 to 24 characters.
              <br />
              Must include uppercase, lowercase letters, a number, and a special
              character (! * @ # $ %).
            </p>

            {/* Confirm Password input */}
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <input
                type="password"
                id="password_confirm"
                placeholder="Confirm password"
                onChange={(e) => setMatchPassword(e.target.value)}
                value={matchPassword}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                className="w-full outline-none"
              />
            </div>
            {/* Confirm Password validation message */}
            <p
              id="confirmnote"
              className={`${matchFocus && !validMatch ? "text-red-600 text-sm mt-2" : "hidden"}`}
            >
              Must match the first password input field.
            </p>

            {/* Submit button */}
            <button
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              disabled={
                !validUsername || !validEmail || !validPassword || !validMatch
              }
            >
              Sign up
            </button>
          </form>

          {/* Link to login page */}
          <div className="text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log in
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

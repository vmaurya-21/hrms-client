import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../lib/axios";
import useAuth from "../../hooks/auth/useAuth";
import { endpoints } from "../../constants/urls";
import logo from "../../static/images/calance-logo-edit.png"
import bgimage from "../../static/images/Design-Background.jpg"

/**
 * Login component for user authentication.
 *
 * This component provides a user interface for logging in. It includes fields for username/email and password,
 * handles form submission, and displays error messages if login fails. It also supports persistent login using a checkbox.
 * On successful login, it redirects the user to the previous page or home.
 *
 * @component
 * @memberof pages
 * @example
 * return (
 *   <Login />
 * )
 */
const Login = () => {
  const { setAuth } = useAuth();
  const { LOGIN_API } = endpoints;

  const navigate = useNavigate();
  const location = useLocation();
  const redirection = location.state?.from?.pathname || "/";

  const usernameOrEmailRef = useRef(); 
  const errRef = useRef(); 

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    usernameOrEmailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [usernameOrEmail, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_API,
        JSON.stringify({ usernameOrEmail, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (!response.data) {
        throw new Error("Invalid response from server");
      }

      const { accessToken, username, email } = response.data;

      setAuth({ username, email, accessToken });
      setUsernameOrEmail("");
      setPassword("");
      navigate(redirection, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("The server didn't respond.");
      } else if ([400, 401].includes(err.response?.status)) {
        setErrMsg(err.response?.data?.message);
      } else {
        setErrMsg("Login failed.");
      }

      setTimeout(() => {
        setErrMsg("");
      }, 4000);

      errRef.current.focus();
    }
  };

  return (
    
       <div
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(90%)' }}
        >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center">
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-full shadow-lg">
                            <img
                                src={logo}
                                alt="Calance Logo"
                                className="h-[47px]"
                            />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold font-edu-sa text-center text-gray-800 dark:text-gray-100">
                        LOG IN
                    </h1>

                    <div className="text-center pb-8">
                        <span className="text-red-600 dark:text-red-400">
                            HRMS now supports LDAP authentication, please login with your LDAP credentials.
                        </span>
                    </div>

                    <p
                        ref={errRef}
                        className={`${errMsg ? "text-red-600 dark:text-red-400" : "hidden"} text-center`}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>

                    <div
                        className="flex items-center border border-gray-300 dark:border-gray-600 rounded"
                        title="johnsmith@calance.com --> johnsmith (username)"
                    >
                        <input
                            type="text"
                            id="usernameOrEmail"
                            ref={usernameOrEmailRef}
                            autoComplete="off"
                            placeholder="Username"
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                            value={usernameOrEmail}
                            required
                            className="w-full outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-1"
                        />
                        <i
                            className=" text-gray-400 dark:text-gray-500"
                            title="johnsmith@calance.com --> johnsmith (username)"
                        ></i>
                    </div>

                    <div
                        className="flex items-center border border-gray-300 dark:border-gray-600 rounded"
                        title="LDAP password"
                    >
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            className="w-full outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-1"
                        />
                        <i
                            className=" text-gray-400 dark:text-gray-500"
                            title="LDAP password"
                        ></i>
                    </div>

                    <button
                        type="submit"
                        className="w-full font-inter font-semibold text-lg bg-blue-500 text-white py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition"
                        disabled={!usernameOrEmail || !password}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    
  );
};

export default Login;

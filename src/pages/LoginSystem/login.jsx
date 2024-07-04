import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../lib/axios";
import useAuth from "../../hooks/auth/useAuth";

export const Login = () => {
  const { persist, setAuth, setPersist } = useAuth();

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
        "/user/login",
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
      navigate(redirection, { replace: true }); // We redirect to the previous page
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

  const togglePersist = () => {
    setPersist(!persist);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-3xl font-bold text-center">Login</h1>
          <p
            ref={errRef}
            className={`${errMsg ? "text-red-600" : "hidden"} text-center`}
            aria-live="assertive"
          >
            {errMsg}
          </p>

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

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            disabled={!usernameOrEmail || !password}
          >
            Sign in
          </button>
        </form>

        <div className="text-center mt-4">
          {`You don't have an account?`}{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

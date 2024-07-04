import { Link } from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth";
import useLogout from "../../hooks/auth/useLogout";
import { useState } from "react";

export const Navbar = () => {
  const { auth } = useAuth();
  const logout = useLogout();

  const [headerClass, setHeaderClass] = useState("");
  const menuToggle = () => {
    headerClass === "open" ? setHeaderClass("") : setHeaderClass("open");
  };

  return (
    <header
      className={`bg-white shadow-md p-4 flex justify-between items-center ${headerClass === "open" ? "bg-gray-100" : ""}`}
    >
      <div className="cursor-pointer md:hidden" onClick={menuToggle}>
        <div className="w-6 h-1 bg-gray-800 mb-1"></div>
        <div className="w-6 h-1 bg-gray-800 mb-1"></div>
        <div className="w-6 h-1 bg-gray-800"></div>
      </div>

      <ul className="hidden md:flex md:items-center md:space-x-6">
        <li className="text-xl font-bold text-gray-800">
          <Link to="/">Logo</Link>
        </li>

        <div className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-800"
              onClick={menuToggle}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/protected"
              className="text-gray-600 hover:text-gray-800"
              onClick={menuToggle}
            >
              Protected
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className="text-gray-600 hover:text-gray-800"
              onClick={menuToggle}
            >
              Admin
            </Link>
          </li>
        </div>
      </ul>

      {auth?.accessToken ? (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={logout}
        >
          Log out
        </button>
      ) : (
        <Link
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          to="/login"
        >
          Log in
        </Link>
      )}

      <div
        className={`absolute top-16 left-0 w-full bg-white shadow-md md:hidden ${headerClass === "open" ? "block" : "hidden"}`}
      >
        <ul className="flex flex-col items-center">
          <li>
            <Link
              to="/"
              className="py-2 text-gray-600 hover:text-gray-800"
              onClick={menuToggle}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/protected"
              className="py-2 text-gray-600 hover:text-gray-800"
              onClick={menuToggle}
            >
              Protected
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className="py-2 text-gray-600 hover:text-gray-800"
              onClick={menuToggle}
            >
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

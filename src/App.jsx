import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home/index";
import ProtectedPage from "./pages/Protected/index.jsx";
import Login from "./pages/LoginSystem/login";
import Register from "./pages/LoginSystem/register";
import Error from "./pages/Error/index";

// components
import Navbar from "./components/Navbar";
import { RequireNotAuth, RequireAuth } from "./components/RequireAuth";

// contexts
import { AuthProvider } from "./contexts/AuthProvider.jsx";

/**
 * Main application component.
 *
 * This component sets up the application's routing using React Router and provides the authentication context
 * to the entire application. It defines routes for public pages, protected pages, and authentication pages.
 *
 * @component
 * @example
 * // Example usage:
 * <App />
 *
 * @returns {JSX.Element} The main application component with routing and context providers.
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<RequireNotAuth />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["user", "admin"]} />}>
            <Route path="/protected" element={<ProtectedPage />} />
          </Route>

          <Route path="*" element={<Error code="404" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

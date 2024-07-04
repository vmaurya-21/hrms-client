import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home/index";
import ProtectedPage from "./pages/Protected/index.jsx";
import { Login } from "./pages/LoginSystem/login";
import { Register } from "./pages/LoginSystem/register";
import { Error } from "./pages/Error/index";

import { RequireNotAuth, RequireAuth } from "./components/RequireAuth";
import { AuthProvider } from "./contexts/AuthProvider.jsx";



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

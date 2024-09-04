import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome/index";
import Login from "./pages/LoginSystem/index.jsx";
import Error from "./pages/Error/index";
import Birthday from "./pages/Birthday/index.jsx";
import Sidebar from "./components/Sidebar/index.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { RequireNotAuth, RequireAuth } from "./components/RequireAuth";
import { useState } from "react";
import NewEmployee from "./pages/Hr/newEmployee";
import UploadIncomeTaxForm from "./pages/Hr/UploadIncomeTaxForm";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleCollapse = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="flex">
          <Sidebar onToggleCollapse={handleToggleCollapse} /> {/* Sidebar component */}
          <main className={`flex-1 transition-margin duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
            <Routes>
              <Route path="/view/welcome" element={<Welcome />} />
              <Route element={<RequireNotAuth />}>
                <Route path="login" element={<Login />} />
              </Route>
              <Route path="/view/birthdays" element={<Birthday />} />
              <Route path="/view/newemp" element={<NewEmployee />} />
              <Route path="/view/uploadIncomeTaxExcel" element={<UploadIncomeTaxForm/>}/>
              <Route path="*" element={<Error code="404" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

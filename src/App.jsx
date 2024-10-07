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
import LeaveDetails from "./pages/LeaveDetails";
import ExpenseDetails from "./pages/Reimbursement";
import AnnouncementPage from "./pages/Announcement";
import LeaveTrackerPage from "./pages/LeaveTracker";
import PayslipPage from "./pages/Payslip";
import DeclarationPage from "./pages/ItDeclaration";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleCollapse = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="flex">
          <Sidebar onToggleCollapse={handleToggleCollapse} />
          <main className={`flex-1 transition-margin duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
            <Routes>
              <Route path="/view/welcome" element={<Welcome />} />
              <Route element={<RequireNotAuth />}>
                <Route path="login" element={<Login />} />
              </Route>
              <Route path="/view/birthdays" element={<Birthday />} />
              <Route path="/view/newemp" element={<NewEmployee />} />
              <Route path="/view/uploadIncomeTaxExcel" element={<UploadIncomeTaxForm />} />

              <Route path="/view/leaveDetails" element={<LeaveDetails />} />
              <Route path="/view/expenses" element={<ExpenseDetails />} />
              <Route path="/view/announcements" element={<AnnouncementPage />} />
              <Route path="/view/LeaveTrackerPage1" element={<LeaveTrackerPage />} />
              <Route path="/view/pay_slips" element={<PayslipPage />} />
              <Route path="/view/itDeclarationForm" element={<DeclarationPage />} />
              <Route path="*" element={<Error code="404" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

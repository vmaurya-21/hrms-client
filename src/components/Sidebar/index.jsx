import { Link } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';
import logo from "../../static/images/Calance_logo.png";
import { useState } from 'react';
// import Navigator from '../buttons/Navigator.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBirthdayCake, faHome, faTasks, faChevronDown, faBars, faSun, faMoon, faCog, faBullhorn,
  faBell, faRupee, faUser, faCalendar, faFileText, faFilePdf, faUpload,
  faBalanceScale, faCalculator , faChevronRight, faChevronLeft, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ onToggleCollapse }) => {
  const { user } = useUserStore();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Function to toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  // Function to toggle sidebar collapse
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    onToggleCollapse(!isCollapsed);
  };
  const toggleDropdown = (dropdownId) => {
  setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
};

  return (
    <div className={`h-screen bg-white text-zinc-900 font-semibold border-r-4 border-orange-500 fixed top-0 left-0 z-50 ${isDarkMode ? 'dark:bg-zinc-900 dark:text-zinc-200' : ''} ${isCollapsed ? 'w-16' : 'w-64'} transition-width duration-300`}>
      <div className="p-4 flex flex-col h-full">
        {/* Toggle Button */}
        <button onClick={toggleSidebar} className="self-end  text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 p-2 rounded">
          <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} />
        </button>

        {/* Logo */}
        <div className="flex items-center mb-4">
          <Link to="/view/welcome" className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
            <img src={logo} alt="Logo" className={`h-6 ${isCollapsed ? 'hidden' : 'block'}`} />
          </Link>
        </div>

        {/* Greeting Message */}
        <div className={`bg-zinc-100 dark:bg-zinc-800 p-3 ${isCollapsed ? 'hidden' : ''}`}>
          <div className="text-zinc-900 dark:text-zinc-100 text-lg font-semibold mb-2">
            {`Hello, ${user.fullName}!`}
          </div>
        </div>

        {/* Toggle Theme Button */}
        <button
          onClick={toggleTheme}
          className={`flex items-center  p-2 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors duration-200 ${isCollapsed ? 'justify-center' : ''}`}
        >
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          {!isCollapsed && <span className="ml-2">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        {/* Sidebar Links */}
        <ul className="space-y-2 flex-1">
          <li>
            <Link to="/view/birthdays" className={`flex items-center p-2 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors duration-200 ${isCollapsed ? 'justify-center' : ''}`}>
              <FontAwesomeIcon icon={faBirthdayCake} />
              {!isCollapsed && <span className="ml-2">Birthday Events</span>}
            </Link>
          </li>
          <li>
            <Link to="/view/welcome" className={`flex items-center p-2 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors duration-200 ${isCollapsed ? 'justify-center' : ''}`}>
              <FontAwesomeIcon icon={faHome} />
              {!isCollapsed && <span className="ml-2">Home</span>}
            </Link>
          </li>

          {/* Conditional Dropdowns */}
          {user.roleName === 'Admin' && (
            <li className="relative group">
              <button
                onClick={() => toggleDropdown('adminDropdown')}
                className={`flex items-center p-2 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors duration-200 ${isCollapsed ? 'justify-center' : ''}`}>
                <FontAwesomeIcon icon={faTasks} />
                {!isCollapsed && <span className="ml-2">Admin</span>}
                {!isCollapsed && <FontAwesomeIcon icon={faChevronDown} className="ml-2" />}
              </button>
              <ul className={`absolute left-full top-0 mt-1 bg-zinc-700 text-white w-48 rounded-lg shadow-lg ${openDropdown === 'adminDropdown' ? 'block' : 'hidden'} transition-opacity duration-300 ${isCollapsed ? 'hidden' : ''}`}>
                <li>
                  <Link to="/view/LeaveTrackerPage1" className="flex items-center p-2 hover:bg-zinc-600 transition-colors duration-200">
                    <FontAwesomeIcon icon={faCalendar} />
                    <span className="ml-2">Leave Tracker</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/roleSetup" className="flex items-center p-2 hover:bg-zinc-600 transition-colors duration-200">
                    <FontAwesomeIcon icon={faTasks} />
                    <span className="ml-2">Role Management</span>
                  </Link>
                </li>
              </ul>
            </li>
          )}

          {user.roleName === 'HR' && (
            <li className="relative group">
              <button
                 onClick={() => toggleDropdown('hrDropdown')}
                className={`flex items-center p-2 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded ${isCollapsed ? 'justify-center' : ''}`}>
                <FontAwesomeIcon icon={faTasks} />
                {!isCollapsed && <span className="ml-2">HR</span>}
                {!isCollapsed && <FontAwesomeIcon icon={faChevronDown} className="ml-2" />}
              </button>
              <ul className={`absolute left-28 bottom-0 mt-1 bg-zinc-700 text-white w-48 rounded-lg shadow-lg ${openDropdown === 'hrDropdown' ? 'block' : 'hidden'} transition-opacity duration-300 ${isCollapsed ? 'hidden' : ''}`}>
                <li>
                  <Link to="/view/newemp" className="flex items-center p-2 hover:bg-zinc-600 transition-colors duration-200">
                    <FontAwesomeIcon icon={faUser} />
                    <span className="ml-2">New Employee</span>
                  </Link>
                </li>
                <li>
                  <Link to="/view/uploadIncomeTaxExcel" className="flex items-center p-2 hover:bg-zinc-600 transition-colors duration-200">
                    <FontAwesomeIcon icon={faUpload} />
                    <span className="ml-2">Upload IT Excel</span>
                  </Link>
                </li>
                <li>
                  <Link to="/view/test" className="flex items-center p-2 hover:bg-zinc-600 transition-colors duration-200">
                    <FontAwesomeIcon icon={faCog} />
                    <span className="ml-2">Administration</span>
                  </Link>
                </li>
              </ul>
            </li>
          )}


            <li className="relative group">
            <button className={`flex items-center p-2 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded ${isCollapsed ? 'justify-center' : ''}`}
              onClick={() => toggleDropdown('payrollDropdown')}>
                <FontAwesomeIcon icon={faTasks} />
                {!isCollapsed && <span className="ml-2">Payroll</span>}
                {!isCollapsed && <FontAwesomeIcon icon={faChevronDown} className="ml-2" />}
              </button>
              <ul className={`absolute left-28 bottom-0 mt-1 bg-zinc-700 text-white w-48 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 ${openDropdown === 'payrollDropdown' ? 'block' : 'hidden'} transition-opacity duration-300 ${isCollapsed ? 'hidden' : ''}`}>
                <li>
                  <Link to="/view/itDeclarationForm" className="flex items-center p-2 hover:bg-zinc-600 transition-colors duration-200">
                    <FontAwesomeIcon icon={faCalculator} />
                    <span className="ml-2">Income Tax</span>
                  </Link>
                </li>
                {/* <li>
                  <Link to="/view/tax_declaration_main" className="flex items-center p-2 hover:bg-zinc-600 transition-colors duration-200">
                    <FontAwesomeIcon icon={faFileText} />
                    <span className="ml-2">Tax Declaration</span>
                  </Link>
                </li> */}
                <li>
                  <Link to="/view/pay_slips" className="flex items-center p-2 hover:bg-zinc-600 transition-colors duration-200">
                    <FontAwesomeIcon icon={faFilePdf} />
                                        <span className="ml-2">PaySlips</span>
                  </Link>
                </li>
              </ul>
            </li>


          {/* Leaves Dropdown */}
          <li className="relative group">
            <button
               onClick={() => toggleDropdown('leavesDropdown')}
              className={`flex items-center p-2 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded ${isCollapsed ? 'justify-center' : ''}`}>
              <FontAwesomeIcon icon={faBars} />
              {!isCollapsed && <span className="ml-2">Leaves</span>}
              {!isCollapsed && <FontAwesomeIcon icon={faChevronDown} className="ml-2" />}
            </button>
            <ul className={`absolute left-28 bottom-0 mt-2 bg-zinc-700 text-white w-48 rounded-lg shadow-lg ${openDropdown === 'leavesDropdown' ? 'block' : 'hidden'} transition-opacity duration-300 ${isCollapsed ? 'hidden' : ''}`}>
              <li>
                <Link to="/view/leaveDetails" className="flex items-center p-2 hover:bg-zinc-600 transition-colors duration-200">
                  <FontAwesomeIcon icon={faTasks} />
                  <span className="ml-2">Leave Details</span>
                </Link>
              </li>
              <li>
                <Link to="/view/LeaveTrackerPage1" className="flex items-center p-2 hover:bg-zinc-600 transition-colors duration-200">
                  <FontAwesomeIcon icon={faCalendar} />
                  <span className="ml-2">Leave Tracker</span>
                </Link>
              </li>
              <li>
                {/* <Link to="/hr/leaveTransactions" className="flex items-center p-2 hover:bg-zinc-600 transition-colors duration-200">
                  <FontAwesomeIcon icon={faSearch} />
                  <span className="ml-2">Leave Transactions</span>
                </Link> */}
              </li>
            </ul>
          </li>

          {/* Reimbursement Dropdown */}
          <li className="relative group">
            <button
              onClick={() => toggleDropdown('reimbursmentDropdown')}
              className={`flex items-center p-2 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded ${isCollapsed ? 'justify-center' : ''}`}>
              <FontAwesomeIcon icon={faCog} />
              {!isCollapsed && <span className="ml-2">Reimbursement</span>}
              {!isCollapsed && <FontAwesomeIcon icon={faChevronDown} className="ml-2" />}
            </button>
            <ul className={`absolute left-28 top-0 mt-2 bg-zinc-700 text-white w-48 rounded-lg shadow-lg ${openDropdown === 'reimbursmentDropdown' ? 'block' : 'hidden'} transition-opacity duration-300 ${isCollapsed ? 'hidden' : ''}`}>
              <li>
                <Link to="/view/expenses" className="flex items-center p-2 hover:bg-zinc-600 transition-colors duration-200">
                  <FontAwesomeIcon icon={faRupee} />
                  <span className="ml-2">Expense</span>
                </Link>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-zinc-300 hover:bg-zinc-600">
                  <FontAwesomeIcon icon={faBalanceScale} />
                  <span className="ml-2">LTA</span>
                </a>
              </li>
            </ul>
          </li>

          {/* Announcements */}
          <li>
            <Link to="/view/announcements" className={`flex items-center p-2 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded ${isCollapsed ? 'justify-center' : ''}`}>
              <FontAwesomeIcon icon={faBullhorn} />
              {!isCollapsed && <span className="ml-2">Notices/Policies</span>}
            </Link>
          </li>

          {/* Alerts Dropdown */}
          <li className="relative group">
            <button
               onClick={() => toggleDropdown('alertsDropdown')}
              className={`flex items-center p-2 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded ${isCollapsed ? 'justify-center' : ''}`}>
              <FontAwesomeIcon icon={faBell} />
              {!isCollapsed && <span className="ml-2">Alerts</span>}
              {!isCollapsed && (
                <span className="ml-2 bg-zinc-800 text-white dark:bg-white dark:text-black rounded-full px-2 py-1 text-xs">
                  5
                </span>
              )}
              {!isCollapsed && <FontAwesomeIcon icon={faChevronDown} className="ml-2" />}
            </button>
            <ul className={`absolute left-28 top-0 mt-2 bg-zinc-700 text-white w-48 rounded-lg shadow-lg ${openDropdown === '' ? 'block' : 'hidden'} transition-opacity duration-300 ${isCollapsed ? 'hidden' : ''}`}>
              <li>
                <a href="#" className="flex items-center p-2 hover:bg-zinc-600">
                  <FontAwesomeIcon icon={faRupee} />
                  <span className="ml-2">Expense Alert</span>
                  <span className="ml-2 bg-orange-500 text-white rounded-full px-2 py-1 text-xs">
                    3
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 hover:bg-zinc-600">
                  <FontAwesomeIcon icon={faTasks} />
                  <span className="ml-2">Leave Alert</span>
                  <span className="ml-2 bg-orange-500 text-white rounded-full px-2 py-1 text-xs">
                    2
                  </span>
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <div className="ml-2 mt-8">
          <button className={`flex items-center p-2 px-8 text-lg font-semibold bg-zinc-900 dark:bg-white text-zinc-100 dark:text-zinc-900 hover:bg-zinc-400 dark:hover:bg-zinc-400 rounded ${isCollapsed ? 'justify-center px-0' : ''}`}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            {!isCollapsed && <span className="ml-2">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


import React from 'react';

const DeclarationHeader = () => {
  // Dummy data
  const user = {
    userProfile: {
      empId: '12345',
      fullName: 'John Doe',
      designation: 'Software Engineer',
      dateOfJoining: '2022-01-15',
      panNumber: 'ABCDE1234F',
      epfNumber: 'EPF123456789',
      uanNumber: 'UAN123456789',
    },
  };

  const itDeclarationData = {
    fyCurrentDate: '07-Oct-2024',
  };

  return (
    <div
      className="container bg-zinc-100 dark:bg-zinc-900 mb-2"
      id="printMe"
      style={{ maxHeight: '20vh' }} // Sets max height to 20% of the viewport height
    >
      <div
        className="bg-white dark:bg-zinc-800 p-4 rounded shadow"
      >
        <div
          className="absolute top-4 right-4 hidden-print"
          style={{ textAlign: 'right' }}
        >
          <button
            className="hrms-link text-gray-100 dark:text-gray-800 bg-zinc-800 px-3 py-1 text-lg font-semibold dark:bg-slate-100 rounded-md"
            onClick={() => window.print()}
          >
            <i className="fa fa-print" aria-hidden="true"></i> Print
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          <div className="col-span-1">
            <label className="font-bold text-gray-700 dark:text-gray-300">Name:</label>
            <a
              href="javascript:void(0);"
              onClick={() => alert(`Opening popup for Employee ID: ${user.userProfile.empId}`)}
            >
              <span id="empName" className="text-gray-900 dark:text-gray-200">
                {user.userProfile.fullName}
              </span>
            </a>
          </div>

          <div className="col-span-1">
            <label className="font-bold text-gray-700 dark:text-gray-300">Designation:</label>
            <span id="designation" className="text-gray-900 dark:text-gray-200">
              {user.userProfile.designation}
            </span>
          </div>

          <div className="col-span-1">
            <label className="font-bold text-gray-700 dark:text-gray-300">Calance ID # (New):</label>
            <span id="emp_id" className="text-gray-900 dark:text-gray-200">
              {user.userProfile.empId}
            </span>
          </div>

          <div className="col-span-1">
            <label className="font-bold text-gray-700 dark:text-gray-300">Start Date:</label>
            <span id="doj" className="text-gray-900 dark:text-gray-200">
              {new Date(user.userProfile.dateOfJoining).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>

          <div className="col-span-1">
            <label className="font-bold text-gray-700 dark:text-gray-300">IT Declaration Status as on:</label>
            <span id="declarationStatus" className="text-gray-900 dark:text-gray-200">
              {itDeclarationData.fyCurrentDate}
            </span>
          </div>

          <div className="col-span-1">
            <label className="font-bold text-gray-700 dark:text-gray-300">Income Tax PAN:</label>
            <span id="pan" className="text-gray-900 dark:text-gray-200">
              {user.userProfile.panNumber}
            </span>
          </div>

          <div className="col-span-1">
            <label className="font-bold text-gray-700 dark:text-gray-300">EPF Account No:</label>
            <span id="epf" className="text-gray-900 dark:text-gray-200">
              {user.userProfile.epfNumber}
            </span>
          </div>

          <div className="col-span-1">
            <label className="font-bold text-gray-700 dark:text-gray-300">UAN No:</label>
            <span id="uan" className="text-gray-900 dark:text-gray-200">
              {user.userProfile.uanNumber}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeclarationHeader;

import React from 'react';

const Modal = ({ isOpen, onClose, leaveDetails }) => {
  if (!isOpen) return null;
  console.log(leaveDetails);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-1 rounded-lg shadow-2xl w-[700px] relative">
        <div className="bg-white dark:bg-zinc-800 p-8 rounded-lg">
          {/* Close button */}
          <button
            className="absolute top-3 right-3 text-3xl font-bold text-purple-600 hover:text-red-500 transition duration-300"
            onClick={onClose}
          >
            &times;
          </button>

          {/* Modal Header */}
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 dark:text-white">
            Leave Details
          </h2>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="bg-gray-100 dark:bg-zinc-700 p-4 rounded-lg shadow">
              <p className="mb-2 text-lg"><strong>Name:</strong> <span className="text-gray-600 dark:text-gray-300">{leaveDetails.name}</span></p>
              <p className="mb-2 text-lg"><strong>Leave Type:</strong> <span className="text-gray-600 dark:text-gray-300">{leaveDetails.leaveType}</span></p>
              <p className="mb-2 text-lg"><strong>Description:</strong> <span className="text-gray-600 dark:text-gray-300">{leaveDetails.description}</span></p>
              <p className="mb-2 text-lg"><strong>Email:</strong> <span className="text-gray-600 dark:text-gray-300">{leaveDetails.emailId}</span></p>
              <p className="mb-2 text-lg"><strong>Mobile No:</strong> <span className="text-gray-600 dark:text-gray-300">{leaveDetails.mobNo}</span></p>
            </div>

            {/* Right Column */}
            <div className="bg-gray-100 dark:bg-zinc-700 p-4 rounded-lg shadow">
              <p className="mb-2 text-lg"><strong>Start Date:</strong> <span className="text-gray-600 dark:text-gray-300">{leaveDetails.startDate}</span></p>
              <p className="mb-2 text-lg"><strong>End Date:</strong> <span className="text-gray-600 dark:text-gray-300">{leaveDetails.endDate}</span></p>
              <p className="mb-2 text-lg"><strong>Leave Count:</strong> <span className="text-gray-600 dark:text-gray-300">{leaveDetails.leaveCount}</span></p>
              <p className="mb-2 text-lg"><strong>Status:</strong> <span className="text-gray-600 dark:text-gray-300">{leaveDetails.status}</span></p>
              <p className="mb-2 text-lg"><strong>Manager Name:</strong> <span className="text-gray-600 dark:text-gray-300">{leaveDetails.managerName}</span></p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end mt-6">
            {leaveDetails.approveBtn && (
              <button
                className="bg-purple-600 text-white px-6 py-2 rounded-lg mr-2 hover:bg-purple-700 transition duration-300 shadow-md"
                onClick={() => {
                  console.log('Leave Approved');
                  onClose(); // Optionally close the modal after action
                }}
              >
                Approve
              </button>
            )}

            {leaveDetails.rejectBtn && (
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-lg mr-2 hover:bg-red-700 transition duration-300 shadow-md"
                onClick={() => {
                  console.log('Leave Rejected');
                  onClose(); // Optionally close the modal after action
                }}
              >
                Reject
              </button>
            )}

            {leaveDetails.cancelBtn && (
              <button
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300 shadow-md"
                onClick={onClose}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

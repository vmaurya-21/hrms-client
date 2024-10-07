"use client";

import React, { useEffect, useState } from 'react';
import MyLeave from './MyLeave';
import EmployeeLeave from './EmployeeLeave';
import useLeaveStore from '../../store/useLeaveStore';
import useUserStore from '../../store/useUserStore';
import LeaveRequestModal from '../CreateLeave';

const LeaveDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('myLeave');
  const [isModalOpen, setModalOpen] = useState(false);
  const fetchLeaveDetails = useLeaveStore((state) => state.fetchLeaveDetails);
  const userRole = useUserStore((state) => state.user.roleName);
  const allowedRoles = ['MANAGER', 'HR', 'ADMIN'];

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        await fetchLeaveDetails();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [fetchLeaveDetails]);

  if (loading) {
    return (
      <div className="container mx-auto min-h-screen py-10 bg-white text-black dark:bg-zinc-900 dark:text-white">
        <div className="animate-pulse">
          <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded mb-4 w-1/3 mx-auto"></div>
          <div className="rounded-md border">
            <table className="min-w-full">
              <thead>
                <tr>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <th key={index} className="p-2">
                      <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-full"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 12 }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array.from({ length: 4 }).map((_, colIndex) => (
                      <td key={colIndex} className="p-2">
                        <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-full"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex pt-2 dark:bg-zinc-900 justify-between px-5 items-center pb-2">
        <div className="flex space-x-4">
          <button
            className={`px-6 py-2 font-semibold rounded-md transition ${
              activeTab === 'myLeave'
                ? 'bg-zinc-300 text-black shadow-md'
                : 'bg-white text-black dark:bg-zinc-800 dark:text-white border border-zinc-300'
            } `}
            onClick={() => setActiveTab('myLeave')}
          >
            My Leaves
          </button>
          {allowedRoles.includes(userRole) && (
            <>
              <button
                className={`px-6 py-2 font-semibold rounded-md transition ${
                  activeTab === 'employeeLeave'
                    ? 'bg-zinc-300 text-black shadow-md'
                    : 'bg-white text-black dark:bg-zinc-800 dark:text-white border border-zinc-300'
                } `}
                onClick={() => setActiveTab('employeeLeave')}
              >
                Employee Leaves
              </button>
              <button
                className={`px-6 py-2 font-semibold rounded-md transition ${
                  activeTab === 'compLeave'
                    ? 'bg-zinc-300 text-black shadow-md'
                    : 'bg-white text-black dark:bg-zinc-800 dark:text-white border border-zinc-300'
                } `}
                onClick={() => setActiveTab('compLeave')}
              >
                Comp Leaves
              </button>
            </>
          )}
        </div>
        <button
          className="bg-zinc-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-zinc-700 transition duration-300"
           onClick={() => {
    console.log("Create Leave button clicked");
    setModalOpen(true);
  }}
          // onClick={() => setModalOpen(true)}
        >
          Create Leave
        </button>
      </div>

      {activeTab === 'myLeave' && <MyLeave />}
      {activeTab === 'employeeLeave' && <EmployeeLeave />}
      {/* {isModalOpen && <LeaveRequestModal onClose={() => setModalOpen(false)} />} */}
      {isModalOpen && (
  <>
    {console.log("Modal is open")}
    <LeaveRequestModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
  </>
)}

    </div>
  );
};

export default LeaveDetails;

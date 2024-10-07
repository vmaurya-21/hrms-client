"use client";

import React, { useEffect, useState } from 'react';
import MyExpense from './MyExpense';
import EmployeeExpense from './EmployeeExpense'; // Employee Expense component
import useExpenseStore from '../../store/useExpenseStore';
import useUserStore from '../../store/useUserStore'; // Zustand store for user roles

const ExpenseDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('myExpense'); // State for tab switching
  const fetchExpenseDetails = useExpenseStore((state) => state.fetchExpenseDetails); // Fetching method
  const userRole = useUserStore((state) => state.user.roleName); // Access user role

  // Roles allowed to view Employee Expense tab
  const allowedRoles = ['MANAGER', 'HR', 'ADMIN', 'FINANCE ADMIN'];

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        await fetchExpenseDetails();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [fetchExpenseDetails]);

  if (loading) {
    return (
      <div className="container mx-auto min-h-screen py-10 bg-white text-black dark:bg-zinc-900 dark:text-white">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="h-6 bg-gray-200 dark:bg-zinc-700 rounded mb-4 w-1/3 mx-auto"></div>

          {/* Table skeleton */}
          <div className="rounded-md border">
            <table className="min-w-full">
              <thead>
                <tr>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <th key={index} className="p-2">
                      <div className="h-6 bg-gray-200 dark:bg-zinc-700 rounded w-full"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 12 }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array.from({ length: 4 }).map((_, colIndex) => (
                      <td key={colIndex} className="p-2">
                        <div className="h-6 bg-gray-200 dark:bg-zinc-700 rounded w-full"></div>
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

  // Tab Navigation items
  const tabs = [
    { name: 'My Expense', value: 'myExpense' },
    { name: 'Employee Expense', value: 'employeeExpense', roles: allowedRoles },
  ];

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex pt-2 dark:bg-zinc-900 justify-center space-x-4 pb-2 border-b border-gray-300 dark:border-zinc-700">
        {tabs.map((tab) => (
          tab.roles ? (allowedRoles.includes(userRole) && (
            <button
              key={tab.value}
              className={`px-6 py-2 font-semibold rounded-md transition ${
                activeTab === tab.value
                  ? 'bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 shadow-md'
                  : 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.name}
            </button>
          )) : (
            <button
              key={tab.value}
              className={`px-6 py-2 font-semibold rounded-md transition ${
                activeTab === tab.value
                  ? 'bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 shadow-md'
                  : 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.name}
            </button>
          )
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'myExpense' && <MyExpense />}
      {activeTab === 'employeeExpense' && <EmployeeExpense />}
    </div>
  );
};

export default ExpenseDetails;

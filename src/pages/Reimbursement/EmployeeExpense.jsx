import React from 'react';
import { DataTable } from './data-table'; // Adjust path if needed
import { columns } from './column'; // Assuming you have defined columns for expenses
import useExpenseStore from '../../store/useExpenseStore'; // Import the expense store

const EmployeeExpense = () => {
  const expenses = useExpenseStore((state) => state.expenses); // Access expenses from the store

  console.log("All expenses:", expenses); // Log all expenses to inspect the data

  // Ensure that the status field exists and is in the correct format
  const draftExpenses = expenses.filter(
    (expense) => expense.status && expense.status.trim().toUpperCase() === 'DRAFT'
  );

  console.log("Draft Expenses:", draftExpenses); // Log draft expenses to inspect filtering

  // Ensure the data is available
  if (!expenses || expenses.length === 0) {
    return <div>No expenses available or loading...</div>;
  }

  return (
    <div>
      {/* <h2 className="text-xl font-bold mb-4">Employee Expenses (Draft)</h2> */}
      <DataTable columns={columns} data={draftExpenses} /> {/* Pass the filtered data */}
    </div>
  );
};

export default EmployeeExpense;

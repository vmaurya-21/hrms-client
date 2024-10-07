import React from 'react';
import { DataTable } from './data-table'; // Adjust path if needed
import { columns } from './column'; // Assuming you have defined columns for expenses
import useExpenseStore from '../../store/useExpenseStore'; // Import the expense store

const MyExpense = () => {
  const expenses = useExpenseStore((state) => state.expenses); // Access expenses from the store
  console.log(expenses);

  return (
    <div>
      {/* <h2 className="text-xl font-bold mb-4">My Expenses</h2> */}
      <DataTable columns={columns} data={expenses} /> {/* Pass the expense data */}
    </div>
  );
};

export default MyExpense;

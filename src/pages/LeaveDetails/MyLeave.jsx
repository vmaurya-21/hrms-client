import React from 'react';
import { DataTable } from './data-table';
import { columns } from './column';
import useLeaveStore from '../../store/useLeaveStore';
import useUserStore from '../../store/useUserStore'; // Importing user store

const MyLeave = () => {
  const leaves = useLeaveStore((state) => state.leaves);
  const user = useUserStore((state) => state.user); // Assuming user object has managerId
  const userManagerId = user?.managerId;

  // Filter leaves where the managerId matches the user's managerId
  const filteredLeaves = leaves.filter((leave) => leave.managerId === userManagerId);

  console.log(filteredLeaves);

  return (
    <div>
      {/* <h2 className="text-xl font-bold mb-4">My Leaves</h2> */}
      <DataTable columns={columns} data={filteredLeaves} />
    </div>
  );
};

export default MyLeave;

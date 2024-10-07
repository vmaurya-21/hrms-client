export const columns = [
  {
    id: 'leaveId', // Add unique id for the column
    header: 'Id',
    accessorKey: 'leaveId', // Corresponds to the data from the API
  },
  {
    id: 'createdAt', // Add unique id for the column
    header: 'Apply Date',
    accessorKey: 'createdAt', // Apply date
  },
  {
    id: 'startDate', // Add unique id for the column
    header: 'From',
    accessorKey: 'startDate',
  },
  {
    id: 'endDate', // Add unique id for the column
    header: 'To',
    accessorKey: 'endDate',
  },
  {
    id: 'leaveType', // Add unique id for the column
    header: 'Leave Type',
    accessorKey: 'leaveType',
  },
  {
    id: 'status', // Add unique id for the column
    header: 'Status',
    accessorKey: 'status',
  },
  {
    id: 'leaveCount', // Add unique id for the column
    header: 'Leave Count',
    accessorKey: 'leaveCount',
  },
  {
    id: 'managerId', // Add unique id for the column
    header: 'Manager Id',
    accessorKey: 'managerId',
  },
];

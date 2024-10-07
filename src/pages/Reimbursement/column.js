const formatDate = (dateArray) => {
  const [year, month, day, hour, minute] = dateArray;
  const date = new Date(year, month - 1, day, hour, minute);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const columns = [
  {
    id: 'expenseReportNo',
    header: 'Id',
    accessorKey: 'expenseReportNo',
  },
  {
    id: 'createdAt',
    header: 'Date',
    accessorKey: 'createdAt',
    cell: ({ row }) => {
      const createdAtArray = row.original.createdAt;
      return formatDate(createdAtArray);
    }
  },
  {
    id: 'projectType',
    header: 'Project Type',
    accessorKey: 'projectType',
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
  },
  {
    id: 'costCenter',
    header: 'Cost Center',
    accessorKey: 'costCenter',
  },
  {
    id: 'expenseReportType',
    header: 'Expense Type',
    accessorKey: 'expenseReportType',
  },
  {
    id: 'totalExpense',
    header: 'Claim Amount',
    accessorKey: 'totalExpense',
  },
];

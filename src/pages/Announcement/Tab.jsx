// Tabs.js
import { DataTable } from './data-table';
import columns from './column';

export const Policies = () => {
  // Sample data for the Policies table
  const policiesData = [
    { number: 1, title: 'Policy 1', createdBy: 'HR', lastUpdated: '2024-09-01' },
    { number: 2, title: 'Policy 2', createdBy: 'Admin', lastUpdated: '2024-09-05' },
    // Add more sample data as needed
  ];
    console.log(policiesData);
  return (
    <div>
      <DataTable columns={columns} data={policiesData} />
    </div>
  );
};

export const Announcement = () => {
  // Sample data for the Policies table
  const policiesData = [
    { number: 1, title: 'Policy 3', createdBy: 'HR', lastUpdated: '2024-09-01' },
    { number: 2, title: 'Policy 4', createdBy: 'Admin', lastUpdated: '2024-09-05' },
    // Add more sample data as needed
  ];

  return (
    <div>
      <DataTable columns={columns} data={policiesData} />
    </div>
  );
};

export const Help = () => {
  // Sample data for the Policies table
  const policiesData = [
    { number: 1, title: 'Policy 5', createdBy: 'HR', lastUpdated: '2024-09-01' },
    { number: 2, title: 'Policy 6', createdBy: 'Admin', lastUpdated: '2024-09-05' },
    // Add more sample data as needed
  ];

  return (
    <div>
      <DataTable columns={columns} data={policiesData} />
    </div>
  );
};


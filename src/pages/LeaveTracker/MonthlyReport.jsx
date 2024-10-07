import { useState } from 'react';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '../../@/components/ui/select';
import { Button } from '../../@/components/ui/button';
import { Input } from '../../@/components/ui/input';
import { DataTable } from './data-table'; // Import the DataTable component
import { columns } from './column'; // Import the columns

const employees = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'David Brown' },
];

// Dummy data
const dummyData = [
  {
    employeeId: '001',
    employeeName: 'John Doe',
    leaveType: 'Sick Leave',
    plannedLeaves: 2,
    actualLeaves: 1,
  },
  {
    employeeId: '002',
    employeeName: 'Jane Smith',
    leaveType: 'Casual Leave',
    plannedLeaves: 3,
    actualLeaves: 2,
  },
];

const MonthlyReport = () => {
  const [employee, setEmployee] = useState('');
  const [monthYear, setMonthYear] = useState('');  // Combine month and year in one input
  const [reportData, setReportData] = useState([]);

  const handleGenerateReport = () => {
    // This is where API call logic would go. For now, we're using dummy data.
    setReportData(dummyData);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-zinc-100">Monthly Report</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Select Employee */}
        <Select onValueChange={setEmployee}>
          <SelectTrigger className="bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
            <SelectValue placeholder="Select Employee" />
          </SelectTrigger>
          <SelectContent>
            {employees.map((emp) => (
              <SelectItem key={emp.id} value={emp.name}>
                {emp.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Select Month and Year */}
        <Input
          type="month"
          className="bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100"
          value={monthYear}  // Controlled input
          onChange={(e) => setMonthYear(e.target.value)}
          placeholder="Select Month and Year"
        />
      </div>

      <Button
        onClick={handleGenerateReport}
        className="mb-6 bg-zinc-800 text-white dark:bg-zinc-700 dark:text-zinc-100 hover:bg-zinc-700 dark:hover:bg-zinc-600"
      >
        Show Report
      </Button>

      {reportData.length > 0 && (
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={reportData} />
        </div>
      )}
    </div>
  );
};

export default MonthlyReport;

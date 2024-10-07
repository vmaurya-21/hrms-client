import { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from '../../@/components/ui/select';
import { Button } from '../../@/components/ui/button';
import { Input } from '../../@/components/ui/input';
import { DataTable } from './data-table'; // import DataTable component
import { columns } from './column'; // import columns configuration

const employees = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'David Brown' },
];

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

const DateRangeReport = () => {
  const [employee, setEmployee] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reportData, setReportData] = useState([]);

  const handleGenerateReport = () => {
    // This is where API call logic would go. For now, we're using dummyData.
    setReportData(dummyData);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Report by Date Range</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select onValueChange={setEmployee}>
          <SelectTrigger className="dark:bg-zinc-800"> {/* Add dark mode bg */}
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

        <Input
          type="date"
          onChange={(e) => setFromDate(e.target.value)}
          placeholder="From Date"
          className="dark:bg-zinc-800" // Add dark mode bg
        />

        <Input
          type="date"
          onChange={(e) => setToDate(e.target.value)}
          placeholder="To Date"
          className="dark:bg-zinc-800" // Add dark mode bg
        />
      </div>

      <Button onClick={handleGenerateReport} className="mb-4">
        Show Report
      </Button>

      {reportData.length > 0 && (
        <DataTable columns={columns} data={reportData} />
      )}
    </div>
  );
};

export default DateRangeReport;

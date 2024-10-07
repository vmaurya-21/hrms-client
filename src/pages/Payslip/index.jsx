import { useState } from 'react';
import { Button } from '../../@/components/ui/button';
import { Input } from '../../@/components/ui/input';
import payslip from "../../static/images/PAYSLIP_C240606_AUG.pdf";

const PayslipPage = () => {
  const [monthYear, setMonthYear] = useState('');
  const [fetchedPayslip, setFetchedPayslip] = useState(null);  // Store fetched payslip (PDF URL)
  const [isFetching, setIsFetching] = useState(false);

  const handleFetchPayslip = () => {
    // Simulate API call to fetch payslip PDF
    setIsFetching(true);

    setTimeout(() => {
      // Simulating successful fetch of the payslip
      setFetchedPayslip(payslip);  // Set the PDF file path
      setIsFetching(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 flex items-center justify-center">
      <div className="w-full max-w-lg p-8 bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-zinc-800 dark:text-zinc-100 mb-6">
          Download Pay Slips
        </h1>

        {/* Month & Year Selection */}
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="monthYear" className="mb-2 text-zinc-700 dark:text-zinc-300">
            Select Month and Year:
          </label>
          <Input
            id="monthYear"
            type="month"
            className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 text-zinc-800 dark:text-zinc-100"
            value={monthYear}
            onChange={(e) => setMonthYear(e.target.value)}
          />
        </div>

        {/* Fetch Payslip Button */}
        <div className="flex justify-center mb-6">
          <Button
            onClick={handleFetchPayslip}
            className="bg-zinc-800 text-white dark:bg-zinc-700 dark:text-zinc-100 hover:bg-zinc-700 dark:hover:bg-zinc-600 px-4 py-2 rounded"
          >
            {isFetching ? 'Checking...' : 'Check'}
          </Button>
        </div>

        {/* Display File Name and Download Button */}
        {fetchedPayslip && (
          <div className="flex flex-col items-center mb-4">
            {/* Display File Name */}
            <p className="mb-4 text-zinc-800 dark:text-zinc-100">
              File: PAYSLIP_C240606_AUG.pdf
            </p>

            {/* Download Button */}
            <a
              href={fetchedPayslip}
              download={payslip}
              className="bg-zinc-800 text-white dark:bg-zinc-700 dark:text-zinc-100 hover:bg-zinc-700 dark:hover:bg-zinc-600 px-4 py-2 rounded mb-4"
            >
              Download Pay Slip
            </a>
          </div>
        )}

        {/* Note about the Password */}
        <p className="text-zinc-600 dark:text-zinc-400 text-sm text-center">
          Note: Password to open Pay Slip file is the leading four characters of PAN number and Birth Year in the YYYY format.
        </p>
      </div>
    </div>
  );
};

export default PayslipPage;

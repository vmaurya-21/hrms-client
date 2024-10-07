import { useState } from 'react';
import { Button } from "../../@/components/ui/button";
import MonthlyReport from './MonthlyReport';
import DateRangeReport from './DataRangeReport';
import { cn } from '../../@/lib/utils';

const LeaveTrackerPage = () => {
  const [activeTab, setActiveTab] = useState('monthly');

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-6">Leave Tracker</h1>

        <div className="flex justify-center mb-4">
          <Button
            variant={activeTab === 'monthly' ? 'default' : 'ghost'}
            className={cn(
              'px-4 py-2 rounded-t-lg',
              activeTab === 'monthly' && 'text-white bg-zinc-700 dark:bg-zinc-700'
            )}
            onClick={() => setActiveTab('monthly')}
          >
            Get Monthly Report
          </Button>
          <Button
            variant={activeTab === 'dateRange' ? 'default' : 'ghost'}
            className={cn(
              'px-4 py-2 rounded-t-lg',
              activeTab === 'dateRange' && 'text-white bg-zinc-700 dark:bg-zinc-700'
            )}
            onClick={() => setActiveTab('dateRange')}
          >
            Report by Date Range
          </Button>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-800 p-6 shadow-lg rounded-lg transition-colors">
          {activeTab === 'monthly' ? <MonthlyReport /> : <DateRangeReport />}
        </div>
      </div>
    </div>
  );
};

export default LeaveTrackerPage;

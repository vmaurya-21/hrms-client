import { useEffect, useState } from 'react';
import { columns } from "./column";
import { DataTable } from "./data-table";
import { getBirthday } from '../../services/apiServices';

export default function DemoPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getBirthday();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    // Shimmer UI when loading
    return (
      <div className="container mx-auto min-h-screen py-10 bg-white text-black dark:bg-zinc-900 dark:text-white">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="h-6 bg-gray-200 dark:bg-zinc-700 rounded mb-4 w-1/3 mx-auto"></div>

          {/* Table skeleton */}
          <div className="rounded-md border">
            <table className="min-w-full">
              <thead>
                <tr>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <th key={index} className="p-2">
                      <div className="h-6 bg-gray-200 dark:bg-zinc-700 rounded w-full"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 12 }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array.from({ length: 4 }).map((_, colIndex) => (
                      <td key={colIndex} className="p-2">
                        <div className="h-6 bg-gray-200 dark:bg-zinc-700 rounded w-full"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white">
      <div className="container mx-auto py-10 flex-1">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold dark:text-white">Birthday in Current Month</h2>
          <hr className="my-4 border-gray-300 dark:border-zinc-600" />
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

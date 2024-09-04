import { useEffect, useState } from 'react';
import { columns } from "./column";
import { DataTable } from "./data-table";

async function getData() {
  return [
    {
      id: "001",
      employeeName: "John Doe",
      emailId: "john.doe@example.com",
      designation: "Software Engineer",
      dateOfBirth: "1990-01-15",
    },
    {
      id: "002",
      employeeName: "Jane Smith",
      emailId: "jane.smith@example.com",
      designation: "Project Manager",
      dateOfBirth: "1985-03-22",
    },
    {
      id: "003",
      employeeName: "Alice Johnson",
      emailId: "alice.johnson@example.com",
      designation: "UX Designer",
      dateOfBirth: "1992-07-10",
    },
    {
      id: "004",
      employeeName: "Bob Brown",
      emailId: "bob.brown@example.com",
      designation: "Data Analyst",
      dateOfBirth: "1988-11-05",
    },
    {
      id: "005",
      employeeName: "Charlie Davis",
      emailId: "charlie.davis@example.com",
      designation: "Product Owner",
      dateOfBirth: "1993-09-25",
    },
  ];
}

export default function DemoPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData();
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
    return (
      <div className="container mx-auto py-10 bg-white text-black dark:bg-gray-900 dark:text-white">
        Loading...
      </div>
    );
  }

  return (
    
     <div className="flex flex-col h-screen bg-white text-black dark:bg-zinc-900 dark:text-white">
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

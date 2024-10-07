import {useState} from 'react';
import { DataTable } from './data-table';
import { columns } from './column';
import useLeaveStore from '../../store/useLeaveStore';
import useUserStore from '../../store/useUserStore'; // Importing user store
import Modal from './Modal';

const EmployeeLeave = () => {
  const leaves = useLeaveStore((state) => state.leaves);
  const user = useUserStore((state) => state.user); // Assuming user object has empId
  const userEmpId = user?.empId;

  // Filter leaves where the managerId matches the user's empId
  const filteredLeaves = leaves.filter((leave) => leave.managerId === userEmpId);

    console.log(filteredLeaves);

  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleViewClick = (rowData) => {
    setSelectedLeave(rowData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedLeave(null); // Clear selected leave details
  };


  return (
    <div>
      {/* <h2 className="text-xl font-bold mb-4">Employee Leaves</h2> */}
          <DataTable columns={columns} data={filteredLeaves} onRowClick={handleViewClick}/>

          {/* Render the modal and pass the selected leave details */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        leaveDetails={selectedLeave}
      />
    </div>
  );
};

export default EmployeeLeave;

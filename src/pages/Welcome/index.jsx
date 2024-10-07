import { useState, useEffect, Suspense, lazy } from 'react';
import useUserStore from '../../store/useUserStore';
import male_avatar from "../../static/images/gender_male_avatar.png";
import female_avatar from "../../static/images/gender_female_avatar.png";

// Lazy load the BirthdayCard component
const BirthdayCard = lazy(() => import('./BirthdayCard'));

const WelcomePage = () => {
  const { user } = useUserStore();
  const setUser = useUserStore((state) => state.setUser);
  const fetchUserData = useUserStore((state) => state.fetchUserData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManagerModalOpen, setIsManagerModalOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [fileInputKey] = useState(Date.now());

  useEffect(() => {
    fetchUserData();
  }, [setUser]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleManagerModal = () => {
    setIsManagerModalOpen(!isManagerModalOpen);
  };

  const handleProfileRemove = () => {
    setPhoto(null); // Remove the photo
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    document.getElementById('file-input').click();
  };

  // Shimmer effect component
  const ShimmerEffect = () => (
    <div className="mt-6 bg-gray-200 dark:bg-zinc-700 animate-pulse rounded-lg h-32">
      <div className="h-full w-full bg-gray-300 rounded-lg"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-zinc-900 dark:to-zinc-800 text-zinc-800 dark:text-zinc-200">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
            {/* User Details */}
            {[
              { label: 'Name', value: user.fullName },
              { label: 'Employee ID', value: user.empId },
              { label: 'Manager', value: <span className="text-blue-600 cursor-pointer" onClick={toggleManagerModal}>{user.managerName}</span> },
              { label: 'Mobile', value: <span><i className="fas fa-mobile-alt mr-2"></i>{user.phone1}</span> },
              { label: 'E-Mail', value: <a href={`mailto:${user.userEmail}`} className="text-blue-600 hover:underline">{user.officeEmail}</a> },
              { label: 'D.O.J', value: new Date(user.dateOfJoining).toLocaleDateString("en-GB") },
              { label: 'Address', value: user.permanentAddress },
              { label: 'Designation', value: user.designation },
              { label: 'Gender', value: user.gender },
              { label: 'D.O.B', value: user.dateOfBirth },
              { label: 'Earned Leave Balance', value: user.earnedLeaveBalance },
              { label: 'Role', value: user.roleName },
            ].map((detail, index) => (
              <div key={index} className="mb-4 flex items-center gap-8">
                <p className="text-lg font-semibold w-40">{detail.label}:</p>
                <p className="text-lg">{detail.value}</p>
              </div>
            ))}
          </div>

          <div className="col-span-1 bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 text-center">
            <div className="relative">
              <img
                className="w-32 h-32 rounded-full border-2 border-blue-500 shadow-lg mx-auto cursor-pointer"
                src={photo || (user.gender === "Male" ? male_avatar : female_avatar)}
                alt="Profile"
                onClick={triggerFileInput}
              />
              <button
                className="mt-4 font-semibold text-lg bg-blue-600 text-white dark:text-black py-2 px-4 rounded-md hover:bg-blue-700 dark:bg-white dark:hover:bg-gray-300"
                onClick={handleProfileRemove}
              >
                Remove Photo
              </button>
              <input
                id="file-input"
                key={fileInputKey}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>
            <p className="mt-4 text-sm italic">(Note: File size cannot be more than 1MB)</p>
            <div className="mt-4">
              <Suspense fallback={<ShimmerEffect />}><BirthdayCard /></Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Manager Modal */}
    {isManagerModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-1 rounded-lg shadow-2xl w-[700px] relative">
      <div className="bg-white dark:bg-zinc-800 p-8 rounded-lg">
        <span
          className="absolute top-3 right-3 p-4 cursor-pointer text-3xl font-bold text-purple-600 hover:text-red-500 transition duration-300"
          onClick={toggleManagerModal}
        >
          &times;
        </span>
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 dark:text-white">
          Manager Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column with Avatar and Name */}
          <div className="flex items-center bg-gray-100 dark:bg-zinc-700 p-4 rounded-lg shadow">
            <img
              src={male_avatar} // Replace with your avatar image URL
              alt="Manager Avatar"
              className="w-24 h-24 rounded-full border-2 border-purple-600"
            />
            <div className="ml-4">
              <p className="mb-2 text-lg">
                <strong>Name:</strong> <span className="text-gray-600 dark:text-gray-300">{user.managerName}</span>
              </p>
            </div>
          </div>

          {/* Right Column with Email and Phone */}
          <div className="bg-gray-100 dark:bg-zinc-700 p-4 rounded-lg shadow">
            <p className="mb-2 text-lg">
              <strong>Email:</strong> <span className="text-gray-600 dark:text-gray-300">{user.managerEmail}</span>
            </p>
            <p className="mb-2 text-lg">
              <strong>Phone:</strong> <span className="text-gray-600 dark:text-gray-300">{user.managerPhone}</span>
            </p>
          </div>
        </div>
        {/* Close button */}
        <div className="flex justify-end mt-6">
          <button
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300 shadow-md"
            onClick={toggleManagerModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default WelcomePage;

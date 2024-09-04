import { useState } from 'react';
import useUserStore from '../../store/useUserStore';
import male_avatar from "../../static/images/gender_male_avatar.png";
import female_avatar from "../../static/images/gender_female_avatar.png";

const WelcomePage = () => {
  const { user } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleProfileRemove = () => {
    // Handle profile photo removal logic
    console.log("Profile photo removed");
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic here
      setPhoto(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    document.getElementById('file-input').click();
  };

  return (
  
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2 bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
            <div className="mb-4 flex items-center gap-4">
              <p className="text-lg font-semibold w-40">Name:</p>
              <p className="text-lg">{user.userProfile.fullName}</p>
            </div>

            <div className="mb-4 flex items-center gap-4">
              <p className="text-lg font-semibold w-40">Employee ID:</p>
              <p className="text-lg">{user.userProfile.empId}</p>
            </div>

            <div className="mb-4 flex items-center gap-4">
              <p className="text-lg font-semibold w-40">Manager:</p>
              <p className="text-lg bg-zinc-100 dark:bg-slate-600 p-1 rounded-md">{user.managerName}</p>
            </div>

            <div className="mb-4 flex items-center gap-4">
              <p className="text-lg font-semibold w-40">Mobile:</p>
              <p className="text-lg flex items-center">
                <i className="fas fa-mobile-alt mr-2"></i>
                {user.userPhone}
              </p>
            </div>

            <div className="mb-4 flex items-center gap-4">
              <p className="text-lg font-semibold w-40">E-Mail:</p>
              <p className="text-lg">
                <a href={`mailto:${user.userEmail}`} className="text-blue-500 hover:underline">
                  {user.userEmail}
                </a>
              </p>
            </div>

            <div className="mb-4 flex items-center gap-4">
              <p className="text-lg font-semibold w-40">D.O.J:</p>
              <p className="text-lg">
                {new Date(user.userProfile.dateOfJoining).toLocaleDateString("en-GB")}
              </p>
            </div>

            <div className="mb-4 flex items-center gap-4">
              <p className="text-lg font-semibold w-40">Address:</p>
              <p className="text-lg">{user.userProfile.permanentAddress}</p>
            </div>

            <div className="mb-4 flex items-center gap-4">
              <p className="text-lg font-semibold w-40">Designation:</p>
              <p className="text-lg">{user.userProfile.designation}</p>
            </div>

            <div className="mb-4 flex items-center gap-4">
              <p className="text-lg font-semibold w-40">Gender:</p>
              <p className="text-lg">{user.userProfile.gender}</p>
            </div>

            <div className="mb-4 flex items-center gap-4">
              <p className="text-lg font-semibold w-40">D.O.B:</p>
              <p className="text-lg">
                {new Date(user.userProfile.dateOfBirth).toLocaleDateString("en-GB")}
              </p>
            </div>

            <div className="mb-4 flex items-center gap-4">
              <p className="text-lg font-semibold w-40">Earned Leave Balance:</p>
              <p className="text-lg">{user.userProfile.earnedLeaveBalance}</p>
            </div>

            <div className="mb-4 flex items-center gap-4">
              <p className="text-lg font-semibold w-40">Role:</p>
              <p className="text-lg">{user.roleName}</p>
            </div>
          </div>

          <div className="col-span-1 bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 text-center">
            <div className="relative">
              <img
                className="w-32 h-32 rounded-full mx-auto cursor-pointer"
                src={photo || (user.userProfile.gender === "Male" ? male_avatar : female_avatar)}
                alt="Profile"
                onClick={triggerFileInput}
              />
              <button
                className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full"
                onClick={handleProfileRemove}
              >
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
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg w-3/4">
            <span className="absolute top-0 right-0 p-4 cursor-pointer" onClick={toggleModal}>
              &times;
            </span>
            <div className="modal-content">
              {/* Modal Content Goes Here */}
            </div>
          </div>
        </div>
      )}
      </div>
      
  );
};

export default WelcomePage;

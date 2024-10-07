import React, { useState } from 'react';
import { Policies, Announcement, Help} from './Tab'; // Import your tab components
import useUserStore from '../../store/useUserStore'; // Import user store

const AnnouncementPage = () => {
  const [activeTab, setActiveTab] = useState('policies'); // Default active tab
  const userRole = useUserStore((state) => state.user.roleName); // Access user role

  // Roles allowed to access Archive tab
  const allowedRolesForArchive = ['HR', 'ADMIN'];

  return (
    <div className="container mx-auto py-4 bg-white text-black dark:bg-zinc-900 dark:text-white">
      {/* Flex container for button and tabs */}
      <div className="flex justify-between mb-4">

        {/* Tab Navigation */}
        <div className="flex space-x-4">
          <button
            className={`px-4 font-semibold rounded-md ${activeTab === 'policies' ? 'bg-zinc-200 text-zinc-800' : 'bg-white text-black dark:bg-zinc-800 dark:text-white border border-zinc-300'}`}
            onClick={() => setActiveTab('policies')}
          >
            Policies
          </button>
          <button
            className={`px-4 py-2 font-semibold rounded-md ${activeTab === 'announcements' ? 'bg-zinc-200 text-zinc-800' : 'bg-white text-black dark:bg-zinc-800 dark:text-white border border-zinc-300'}`}
            onClick={() => setActiveTab('announcements')}
          >
            Announcements
          </button>
          <button
            className={`px-4 py-2 font-semibold rounded-md ${activeTab === 'help' ? 'bg-zinc-200 text-zinc-800' : 'bg-white text-black dark:bg-zinc-800 dark:text-white border border-zinc-300'}`}
            onClick={() => setActiveTab('help')}
          >
            Help & Guide
          </button>
          {allowedRolesForArchive.includes(userRole) && (
            <button
              className={`px-4 py-2 font-semibold rounded-md ${activeTab === 'archive' ? 'bg-zinc-200 text-zinc-800' : 'bg-white text-black dark:bg-zinc-800 dark:text-white border border-zinc-300'}`}
              onClick={() => setActiveTab('archive')}
            >
              Archive
            </button>
                  )}
              </div>

        {userRole === 'HR' && (
          <button className="px-4 py-2 bg-white border border-zinc-300 text-zinc-800 rounded-md shadow-md hover:bg-zinc-100 transition duration-200">
            Add New
          </button>
        )}
      </div>

      {/* Content based on active tab */}
      <div>
        {activeTab === 'policies' && <Policies />}
        {activeTab === 'announcements' && <Announcement/>}
        {activeTab === 'help' && <Help />}
        {/* {activeTab === 'archive' && allowedRolesForArchive.includes(userRole) && <Archive />} */}
      </div>
    </div>
  );
};

export default AnnouncementPage;

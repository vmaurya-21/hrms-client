// leaveStore.js
import { create } from 'zustand';
import { leaveDetails } from '../services/apiServices';

const useLeaveStore = create((set) => ({
  leaves: [],
  loading: false,
  error: null,

  // Fetch leaves and update the state
  fetchLeaveDetails: async () => {
    set({ loading: true, error: null });
    try {
        const data = await leaveDetails(); // Call the API method
        console.log(data);
      set({ leaves: data, loading: false }); // Set the fetched data
    } catch (error) {
      set({ error: 'Failed to fetch leave details', loading: false });
    }
  },
}));

export default useLeaveStore;

import { create } from 'zustand';
import { expenseDetails } from '../services/apiServices';

const useExpenseStore = create((set) => ({
  expenses: [],
  loading: false,
  error: null,

  fetchExpenseDetails: async () => {
    set({ loading: true, error: null });
    try {
      const data = await expenseDetails();
      console.log(data);
      set({ expenses: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch expense details', loading: false });
    }
  },
}));

export default useExpenseStore;

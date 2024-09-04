import {create} from 'zustand';

const useUserStore = create((set) => ({
  user: {
    userProfile: {
      fullName: "Vagish Maurya",
      empId: "12345",
      dateOfJoining: "2024-06-17",
      permanentAddress: "Azamgarh , Uttar Pradesh",
      designation: "Software Development Engineer",
      gender: "Male",
      dateOfBirth: "2002-07-21",
      earnedLeaveBalance: "2.75",
    },
    managerName: "Aniket Habib",
    roleName: "HR",
    userPhone: "9161516309",
    userEmail: "vmaurya@calance.com",
  },
  setUser: (newUser) => set({ user: newUser }),
}));

export default useUserStore;

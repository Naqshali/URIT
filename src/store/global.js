import { create } from 'zustand';

// Define a Zustand store
const userTypeStore = create((set) => ({
  userType:'',
  setUserType: (type) => set({ userType: type }),
}));

export default userTypeStore;
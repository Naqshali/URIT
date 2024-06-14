import { create } from "zustand";
import axiosInstance from "@/axios/axios.config";

const servicesStore = create((set) => ({
  meta: {},
  saveService: async (data) => {
    try {
      const res = await axiosInstance.post("/api/v1/services", data);
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      return null;
    }
  },
}));

export default servicesStore;

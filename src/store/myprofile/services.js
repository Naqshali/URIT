import { create } from "zustand";
import axiosInstance from "@/axios/axios.config";

const servicesStore = create((set) => ({
  meta: {},
  saveService: async () => {
    try {
      const res = await axiosInstance.get("/api/v1/services");
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      return null;
    }
  },
}));

export default servicesStore;

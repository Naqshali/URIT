import { create } from "zustand";
import axiosInstance from "@/axios/axios.config";

const proposalsStore = create((set) => ({
  meta: {},
  submitProposal: async (id, data) => {
    try {
      const res = await axiosInstance.post(
        "/api/v1/projects/" + id + "/proposals",
        data
      );
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      return null;
    }
  },
}));

export default proposalsStore;

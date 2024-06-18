import { create } from "zustand";
import axiosInstance from "@/axios/axios.config";

const proposalsStore = create((set) => ({
  projectProposals: [],
  getProjectAllProposals: async (id) => {
    console.log("asd");
    try {
      const res = await axiosInstance.get(
        "/api/v1/projects/" + id + "/proposals?pageNumber=0&pageSize=10"
      );

      if (res.data) {
        set({ projectProposals: res.data });
      }
    } catch (error) {
      return null;
    }
  },
  submitProposal: async (data, id) => {
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

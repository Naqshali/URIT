import { create } from "zustand";
import axiosInstance from "@/axios/axios.config";

const proposalsStore = create((set) => ({
  projectProposals: [],
  getProjectProposal: async (id, type, page) => {
    try {
      const res = await axiosInstance.get(
        `/api/v1/projects/${id}/proposals?pageNumber=${page ?? 0}&pageSize=10`
      );

      if (res.data && res.data.proposals.length) {
        return type === "SERVICE_PROVIDER" ? res.data.proposals[0] : res.data;
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
  acceptProposal: async (data, id) => {
    try {
      const res = await axiosInstance.put(
        `/api/v1/projects/${id}/accept-proposal?proposalId=${data.proposalId}`
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

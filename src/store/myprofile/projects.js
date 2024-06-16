import { create } from "zustand";
import axiosInstance from "@/axios/axios.config";
import { queryString } from "@/utils/global";

const projectsStore = create((set) => ({
  size: 10,
  allProjects: {
    projects: [],
    totalCount: 0,
  },
  getProjects: async (params) => {
    try {
      const res = await axiosInstance.get(
        "/api/v1/projects?" + queryString(params)
      );
      if (res.data) {
        set({ allProjects: res.data });
      }
    } catch (error) {
      return null;
    }
  },
  saveProject: async (data) => {
    try {
      const res = await axiosInstance.post("/api/v1/projects", data);
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      return null;
    }
  },
}));

export default projectsStore;

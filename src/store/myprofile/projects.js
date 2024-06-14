import { create } from "zustand";
import axiosInstance from "@/axios/axios.config";

const projectsStore = create((set) => ({
  allProjects: [],
  getProjects: async () => {
    try {
      const res = await axiosInstance.get("/api/v1/projects");
      if (res.data) {
        set({ getProjects: res.data });
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

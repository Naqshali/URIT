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
  updateProject: async (data, id) => {
    try {
      console.log(" id", id, data);
      console.log("Aaa", "/api/v1/projects?id" + { id }, data);
      const res = await axiosInstance.put(`/api/v1/projects/${id}`, {
        id: 1,
        title: "New Project",
        status: "OPEN_FOR_PROPOSALS",
        projectCategory: "1",
        freelancerType: "full-time",
        priceType: "mid",
        cost: "500",
        projectDuration: "23",
        description: "",

        projectSkills: ["1", "2", "3"],

        serviceProvider: null,
      });
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      return null;
    }
  },
}));

export default projectsStore;

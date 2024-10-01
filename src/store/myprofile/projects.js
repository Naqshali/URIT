import { create } from "zustand";
import axiosInstance from "@/axios/axios.config";
import { queryString } from "@/utils/global";

const projectsStore = create((set) => ({
  size: 10,
  allProjects: {
    projects: [],
    totalCount: 0,
  },
  singleProject: null,
  getProjects: async (params, filter) => {
    try {
      const res = await axiosInstance.get(
        "/api/v1/projects?" + queryString(params)
      );
      if (res.data) {
        // if (filter) {
        //   const filteredProjects = res.data.projects.filter((project) => {
        //     return project.projectCategory == filter;
        //   });
        //   set({ allProjects: { ...res.data, projects: filteredProjects } });
        // } else {
        // }
        set({ allProjects: res.data });
      }
    } catch (error) {
      return null;
    }
  },
  getSingleProject: async (id) => {
    try {
      const res = await axiosInstance.get(`/api/v1/projects/${id}`);
      if (res.data) {
        set({ singleProject: res.data });
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
  uploadAttachments: async (data, id) => {
    try {
      const res = await axiosInstance.put(
        `/api/v1/projects/${id}/attachments`,
        data
      );
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
      const res = await axiosInstance.put(`/api/v1/projects/${id}`, data);
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      return null;
    }
  },
}));

export default projectsStore;

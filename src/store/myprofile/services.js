import { create } from "zustand";
import axiosInstance from "@/axios/axios.config";
import { queryString } from "@/utils/global";

const servicesStore = create((set) => ({
  meta: {},
  allServices: {
    services: [],
    totalCount: 0,
  },
  getServices: async (params) => {
    try {
      // Get filter from URL if it exists
      const urlParams = new URLSearchParams(window.location.search);
      const filter = urlParams.get('filter');
      
      // Combine params with filter from URL
      const finalParams = {
        ...params,
        ...(filter && { filter }) // Only add filter if it exists
      };

      const res = await axiosInstance.get(
        "/api/v1/services?" + queryString(finalParams)
      );
      if (res.data) {
        set({ allServices: res.data });
        return res.data;
      }
    } catch (error) {
      return null;
    }
  },
  getServiceById: async (id) => {
    try {
      const res = await axiosInstance.get(`/api/v1/services/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      return null;
    }
  },
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
  updateService: async (data, id) => {
    try {
      const res = await axiosInstance.put(`/api/v1/services/${id}`, data);
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      return null;
    }
  },
}));

export default servicesStore;
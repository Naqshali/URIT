import { create } from "zustand";
import axiosInstance from "@/axios/axios.config";
import { queryString } from "@/utils/global";

const providersStore = create((set) => ({
  getServiceProviders: async (params) => {
    try {
      const res = await axiosInstance.get(
        "/api/v1/service-providers?" + queryString(params)
      );
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      return null;
    }
  },
  getServiceProviderById: async (id) => {
    try {
      const res = await axiosInstance.get(`/api/v1/service-providers/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      return null;
    }
  },
}));

export default providersStore;

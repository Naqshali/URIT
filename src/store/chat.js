import { create } from "zustand";
import axiosInstance from "@/axios/axios.config";
import { queryString } from "@/utils/global";

const chatStore = create((set) => ({
  meta: {
    skills: [],
    countries: [],
    services: [],
    languages: [],
    degrees: [],
  },
  getChats: async (params) => {
    try {
      const res = await axiosInstance.get(
        "/api/v1/chat/message?" + queryString(params)
      );

      if (res?.data) {
        return res.data;
      }
    } catch (error) {
      return null;
    }
  },
}));

export default chatStore;

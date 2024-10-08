import { create } from "zustand";
import axiosInstance from "@/axios/axios.config";
import { queryString } from "@/utils/global";

const chatStore = create(() => ({
  getProjectChat: async (params) => {
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
  getChats: async (params) => {
    try {
      const res = await axiosInstance.get(
        "/api/v1/chats?" + queryString(params)
      );

      if (res?.data) {
        return res.data;
      }
    } catch (error) {
      return null;
    }
  },
  setActiveChat: async (params) => {
    try {
      const res = await axiosInstance.put(
        `/api/v1/chats/${params.id}?&isActive=${params.isActive}`
      );

      if (res?.data) {
        return res.data;
      }
    } catch (error) {
      return null;
    }
  },
  startMeeting: async (data) => {
    try {
      const res = await axiosInstance.post(`/api/v1/meetings`, data);

      if (res?.data) {
        return res.data;
      }
    } catch (error) {
      return null;
    }
  },
  addParticipantInMeeting: async (id, data) => {
    try {
      const res = await axiosInstance.post(
        `/api/v1/meetings/${id}/participants`,
        data
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

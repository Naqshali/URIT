import { create } from "zustand";
import axiosInstance from "@/axios/axios.config";
import { queryString } from "@/utils/global";

const notificationsStore = create((set) => ({
  newNotification: null,
  showNotificationIcon: false,
  getNotifications: async (params) => {
    try {
      const res = await axiosInstance.get(
        "/api/v1/notifications?" + queryString(params)
      );

      if (res?.data) {
        return res.data;
      }
    } catch (error) {
      return null;
    }
  },
  saveNewNotification: (data) => {
    set({ newNotification: data });
  },
  setShowNotificationIcon: (data) => {
    set({ showNotificationIcon: data });
  },
}));

export default notificationsStore;

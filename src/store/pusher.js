import { create } from "zustand";

const pusherNotificationStore = create((set, get) => ({
  pusherNotifications: [],
  latestNotification: null,
  saveNotification: (data) => {
    const prevNotifications = get().pusherNotifications;
    const newNotifications = [data.message, ...prevNotifications];
    set({ pusherNotifications: newNotifications });
    set({ latestNotification: data.message });
  },
}));

export default pusherNotificationStore;

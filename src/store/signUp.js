import { create } from "zustand";
import axiosInstance from "@/axios/axios.config";
import { decodeJWT } from "@/utils/global";

const signUpStore = create((set) => ({
  loggedInUser: null,
  signUp: async (data) => {
    try {
      const res = await axiosInstance.post("/api/v1/signup", data);
      if (res.data) {
        const decodedToken = decodeJWT(res.data.token);
        set({ loggedInUser: { ...res.data, ...decodedToken } });
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ ...res.data, ...decodedToken })
        );
        return res.data;
      }
      return null;
    } catch (error) {
      return null;
    }
  },
  login: async (data) => {
    try {
      const res = await axiosInstance.post("/api/v1/login", data);
      if (res.data) {
        const decodedToken = decodeJWT(res.data.token);
        set({ loggedInUser: { ...res.data, ...decodedToken } });
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ ...res.data, ...decodedToken })
        );
        return res.data;
      }
      return null;
    } catch (error) {
      return null;
    }
  },
  logout: async (data) => {
    try {
      const res = await axiosInstance.post("/api/v1/logout", data);
      localStorage.clear();
      set({ loggedInUser: null });
      console.log("Res", res);
      if (res.data) {
        return res.data;
      }
      return null;
    } catch (error) {
      return null;
    }
  },
  setUerLoggedInData: (info) => {
    set({ loggedInUser: info });
  },
}));

export default signUpStore;

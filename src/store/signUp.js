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
        return res.data;
      }
      return null;
    } catch (error) {
      return null;
    }
  },
}));

export default signUpStore;

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
        return { success: true, data: res.data };
      } else {
        console.log(res);
        return { success: false, error: "Email already exist." };
      }
    } catch (error) {
      console.log("in catch:", error)
      if (error.response && error.response.data) {
        return { success: false, error: error.response.data.description };
      }
      return { success: false, error: "Network error occurred" };
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
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      return null;
    }
  },
  setUserLoggedInData: (info) => {
    set({ loggedInUser: info });
  },
}));

export default signUpStore;

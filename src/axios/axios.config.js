import axios from "axios";
import signUpStore from "@/store/signUp";
import Router from "next/router";

const axiosInstance = axios.create({
  baseURL: "http://15.185.76.40/", // Your API base URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify request config, such as adding headers or logging
    const user = signUpStore.getState().loggedInUser;
    if (user) {
      config.headers.Authorization = user.token;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return error;
    // return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Modify response data or handle success
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      signUpStore.getState().setUserLoggedInData("session_expired");
    }
    // Handle response errors
    return error;
    // return Promise.reject(error);
  }
);

export default axiosInstance;

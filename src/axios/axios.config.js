import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://157.175.45.1:8085/', // Your API base URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify request config, such as adding headers or logging
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Modify response data or handle success
    return response;
  },
  (error) => {
    // Handle response errors
    return Promise.reject(error);
  }
);

export default axiosInstance;

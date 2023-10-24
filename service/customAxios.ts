import { LOGIN_PATH_UI } from "@/constants/uiPaths";
import axios from "axios";
import Router from "next/router";

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent

    // Check if a token is in local storage
    const token = localStorage.getItem("crash-Token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } else {
      // Token is not available, redirect to the login page
      void Router.push(LOGIN_PATH_UI);
      throw new Error("No token available. Redirecting to login...");
    }
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      // Unauthorized: Clear local storage and redirect to login page
      localStorage.removeItem("crash-Token");
      void Router.push(LOGIN_PATH_UI);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;

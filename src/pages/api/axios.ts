import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const token = process.browser && localStorage.getItem("token");

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: "http://localhost:3333/api",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

// Add middleware to the Axios instance
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something with the request config before sending the request
    // console.log("Request config:", config);

    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

    // GET request with params
    if (config.method === "get" && config.params) {
      let url = config.url + "?";
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName];
        var part = encodeURIComponent(propName) + "=";
        if (value !== null && typeof value !== "undefined") {
          if (typeof value === "object") {
            for (const key of Object.keys(value)) {
              let params = propName + "[" + key + "]";
              var subPart = encodeURIComponent(params) + "=";
              url += subPart + encodeURIComponent(value[key]) + "&";
            }
          } else {
            url += part + encodeURIComponent(value) + "&";
          }
        }
      }
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }

    return config;
  },
  (error) => {
    // Do something with the request error
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Do something with the response data
    // console.log("Response data:", response.data);
    return response;
  },
  (error) => {
    // Do something with the response error
    // console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;

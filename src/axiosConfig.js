import axios from "axios";

// Development URL
const baseURL = "http://192.168.74.53:9090/";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({ baseURL });
axiosInstance.interceptors.request.use((config) => {
  config.headers = {
    "content-type": "application/json",
    token: token ? token : "",
    ...config.headers,
  };
  return config;
});
export { axiosInstance };

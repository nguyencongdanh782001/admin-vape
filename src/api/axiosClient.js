import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://vape-store.herokuapp.com/api/";
const token = Cookies.get("token");

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

axiosClient.interceptors.request.use((request) => {
  request.headers.token = `Bearer ${token}`;
  return request;
});

export default axiosClient;

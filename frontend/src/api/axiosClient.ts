import axios from "axios";

const getBaseUrl = () => {
  const viteUrl = import.meta.env.VITE_API_BASE_URL;
  return viteUrl || "http://localhost:8000/api";
};

export const axiosClient = axios.create({
  baseURL: getBaseUrl(),
  headers: { "Content-Type": "application/json" },
});

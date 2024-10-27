import axios from "axios";
import { config } from "process";

const headers = {
  Accep: "application/json",
  "Content-Type": "application/json",
  "chace-control": "no-cache",
  Expires: 0,
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers,
  timeout: 60 * 1000,
});

instance.interceptors.response.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instance.interceptors.request.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
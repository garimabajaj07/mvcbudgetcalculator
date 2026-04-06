import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  // Crucial for communicating the JWT HttpOnly cookies set by backend
  withCredentials: true,
});

export default api;

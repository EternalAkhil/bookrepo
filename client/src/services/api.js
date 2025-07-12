import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const API = axios.create({ baseURL: apiUrl });

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;

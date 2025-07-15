import axios from "axios";


const api = axios.create({
  baseURL: process.env.BACKEND_URI || "https://myjobai.onrender.com",
  withCredentials: true,
  
});

export default api;
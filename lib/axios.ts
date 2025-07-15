import axios from "axios";


const api = axios.create({
  baseURL: "https://my-job-ai-backend.vercel.app",
  withCredentials: true,
  
});

export default api;
import axios from "axios";


const api = axios.create({
  baseURL: "https://myjobai.onrender.com",
  withCredentials: true,
  
});

export default api;
// api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  withCredentials: true, // 쿠키를 포함하도록 설정
});

export default api;

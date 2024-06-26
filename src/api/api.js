// api.js
import axios from "axios";
import store, { clearUser, setUser } from "../Store/store";

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  withCredentials: true, // 쿠키를 포함하도록 설정
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // 401 에러 발생 시 사용자 정보 초기화
      store.dispatch(clearUser());
    }
    return Promise.reject(error);
  }
);

export const fetchCurrentUser = async () => {
  try {
    const response = await api.get("auth/me");
    store.dispatch(setUser(response.data.data));
  } catch (error) {
    store.dispatch(clearUser());
  }
};
export default api;

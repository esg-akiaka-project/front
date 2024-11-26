import axios from "axios";
import { useUserStore } from "../store/useUserStore";

const axiosInstance = axios.create({
  baseURL: "https://www.harudoyak.site/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
const refreshAxiosInstance = axios.create({
  baseURL: "https://www.harudoyak.site/api/",
});

axiosInstance.interceptors.request.use(
  function (config) {
    const { accessToken } = useUserStore.getState();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  // todo: 실패 응답 반환시 작업 수행
  // accessToken 만료의 경우, refresh를 기반으로 재발급 이후 다시 요청 보내기
  async function (error) {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("auth/reissue")
    ) {
      originalRequest._retry = true;

      const { setAccessToken, clearToken } = useUserStore.getState();
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await refreshAxiosInstance.post("auth/reissue", {
            refreshToken,
          });

          const authorizationHeader = response.headers["authorization"];

          const newAccessToken =
            authorizationHeader && authorizationHeader.split(" ")[1];

          const newRefreshToken = response.data.refreshToken;
          setAccessToken(newAccessToken);

          if (newRefreshToken) {
            localStorage.setItem("refreshToken", newRefreshToken);
          }
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("토큰 재발급 실패:", refreshError);
          clearToken();
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

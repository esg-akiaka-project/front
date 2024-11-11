import axios from "axios";
import { useUserStore } from "../store/useUserStore";

const axiosInstance = axios.create({
  baseURL: "/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const { accessToken } = useUserStore.getState();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    console.log("axiosInstance");
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
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;

// async function (error) {
//   const originalRequest = error.config;

//   if (error.response && error.response.status === 401 && !originalRequest._retry) {
//     originalRequest._retry = true;

//     const { refreshToken, setAccessToken, clearToken } = useUserStore.getState();
//     if (refreshToken) {
//       try {
//         const response = await axios.post("refresh토큰을 통한 access토큰 재발급 api", {
//           refreshToken: refreshToken,
//         });

//         const newAccessToken = response.data.accessToken;
//         setAccessToken(newAccessToken);

//
//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.error("토큰 재발급 실패:", refreshError);
//         clearToken();
//       }
//     }
//   }

//   return Promise.reject(error);
// }

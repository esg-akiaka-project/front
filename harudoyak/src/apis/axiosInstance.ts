import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  function (config) {
    // todo: 요청 전달 전 특정 작업 수행
    // ex) accesstoken 지정
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
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

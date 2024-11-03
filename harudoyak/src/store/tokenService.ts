import { jwtDecode } from "jwt-decode";
import axiosInstance from "../apis/axiosInstance";
import { useUserStore } from "./useUserStore";

interface DecodedToken {
  expiredTime: number;
}

const isTokenExpired = (token: string) => {
  const { expiredTime } = jwtDecode<DecodedToken>(token);
  return Date.now() >= expiredTime * 1000;
};
//
export async function checkAndRefreshToken() {
  const { accessToken, setAccessToken, clearToken } = useUserStore.getState();
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || isTokenExpired(accessToken)) {
    if (refreshToken) {
      try {
        const { data } = await axiosInstance.post("refresh 요청 api", {
          refreshToken,
        });
        setAccessToken(data.accessToken);
      } catch (error) {
        console.error("토큰 갱신 실패:", error);
        clearToken();
      }
    }
  }
}

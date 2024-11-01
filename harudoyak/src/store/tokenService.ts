import { jwtDecode } from "jwt-decode";
import axiosInstance from "../apis/AxiosInstance";
import { useUserStore } from "./useUserStore";

interface DecodedToken {
  exp: number;
}

const isTokenExpired = (token: string) => {
  const { exp } = jwtDecode<DecodedToken>(token);
  return Date.now() >= exp * 1000;
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

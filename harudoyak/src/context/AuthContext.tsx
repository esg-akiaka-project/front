// src/context/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/src/store/useUserStore";
import refreshAxiosInstance from "@/src/apis/axiosInstance";

interface AuthContextProps {
  isAuthenticating: boolean;
}

const AuthContext = createContext<AuthContextProps>({ isAuthenticating: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setAccessToken, clearToken } = useUserStore();
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const refreshAccessToken = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await refreshAxiosInstance.post(
            "https://www.harudoyak.site/api/auth/reissue",
            {
              refreshToken,
            }
          );

          const authorizationHeader = response.headers["authorization"];
          const newAccessToken =
            authorizationHeader && authorizationHeader.split(" ")[1];

          if (newAccessToken) {
            setAccessToken(newAccessToken);
          } else {
            clearToken();
          }

          const newRefreshToken = response.data.refreshToken;
          if (newRefreshToken) {
            localStorage.setItem("refreshToken", newRefreshToken);
          }
        } catch (error) {
          console.error("Access Token 재발급 실패:", error);
          clearToken();
        }
      } else {
        clearToken();
      }
      setIsAuthenticating(false);
    };

    refreshAccessToken();
  }, [setAccessToken, clearToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticating }}>
      {children}
    </AuthContext.Provider>
  );
};

// 상태 관리 파일
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  accessToken: string | null;
  aiName: string;
  userId: string | null;
  exp: number; // 경험치
  nickname: string | null;
  profileImage: string | null; // 프로필 이미지 URL
  setProfileImage: (url: string) => void;
  setAccessToken: (token: string | null) => void;
  clearToken: () => void;
}
// 전역변수를 사용할때는 useUserStore를 import 후에
// const { userId, accessToken, exp } = useUserStore.getState()
// 위 처럼 필요한 정보를 불러와서 쓰면됨

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      accessToken: null,
      userId: null,
      aiName: "도약이",
      exp: 0,
      nickname: null,
      profileImage: null,
      setAccessToken: (token) => set({ accessToken: token }),
      setProfileImage: (url) => set({ profileImage: url }),
      clearToken: () => {
        set({ accessToken: null });
        localStorage.removeItem("refreshToken");
      },
    }),
    {
      name: "userInfoStorage",
      partialize: (state) => {
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => key !== "accessToken" && !key.startsWith("set")
          )
        );
      },
    }
  )
);

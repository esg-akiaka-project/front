// 상태 관리 파일
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  isSociallogin: boolean;
  accessToken: string | null;
  aiName: string | null;
  userId: string | null;
  exp: number; // 경험치
  goalId: string | null;
  nickname: string | null;
  profileImage: string | null; // 프로필 이미지 URL
  setProfileImage: (url: string) => void;
  setAccessToken: (token: string | null) => void;
  setAiName: (name: string) => void;
  setGoalId: (goalId: string) => void;
  setisSociallogin: () => void;
  clearToken: () => void;
}
// 전역변수를 사용할때는 useUserStore를 import 후에
// const { userId, accessToken, exp } = useUserStore.getState()
// 위 처럼 필요한 정보를 불러와서 쓰면됨

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isSociallogin: false,
      accessToken: null,
      userId: null,
      aiName: null,
      exp: 0,
      goalId: null,
      nickname: null,
      profileImage: null,
      setAccessToken: (token) => set({ accessToken: token }),
      setAiName: (name) => set({ aiName: name }),
      setGoalId: (goalId) => set({ goalId }),
      setProfileImage: (url) => set({ profileImage: url }),
      setisSociallogin: () => set({ isSociallogin: true }),
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

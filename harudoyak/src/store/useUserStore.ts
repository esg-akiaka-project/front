// 상태 관리 파일
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  isSociallogin: boolean;
  setisSociallogin: (isSociallogin: boolean) => void;

  accessToken: string | null;
  setAccessToken: (token: string | null) => void;

  aiName: string | null;
  setAiName: (name: string) => void;

  memberId: number | null;
  setMemberId: (memId: number) => void;

  exp: number; // 경험치
  setExp: (exp: number) => void;

  goalName: string | null;
  setGoalName: (goalName: string) => void;

  nickname: string | null;
  setNickname: (nickname: string) => void;

  profileImage: string | null; // 프로필 이미지 URL
  setProfileImage: (url: string) => void;

  clearToken: () => void;
}
// 전역변수를 사용할때는 useUserStore를 import 후에
// const { userId, accessToken, exp } = useUserStore.getState()
// 위 처럼 필요한 정보를 불러와서 쓰면됨

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isSociallogin: false,
      setisSociallogin: (isSociallogin) => set({ isSociallogin }),

      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),

      memberId: null,
      setMemberId: (memberId) => set({ memberId }),

      aiName: null,
      setAiName: (name) => set({ aiName: name }),

      exp: 0,
      setExp: (exp) => set({ exp }),

      goalName: null,
      setGoalName: (goalName) => set({ goalName }),

      nickname: null,
      setNickname: (nickname) => set({ nickname }),

      profileImage: null,
      setProfileImage: (url) => set({ profileImage: url }),

      clearToken: () => {
        set({
          isSociallogin: false,
          accessToken: null,
          memberId: null,
          aiName: null,
          exp: 0,
          goalName: null,
          nickname: null,
          profileImage: null,
        });
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

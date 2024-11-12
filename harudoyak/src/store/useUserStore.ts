// 상태 관리 파일
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  isSociallogin: boolean;
  setisSociallogin: (isSociallogin: boolean) => void;

  accessToken: string | null;
  setAccessToken: (token: string | null) => void;

  aiName: string;
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

  firstDoyak: Date | null;
  setFirstDoyak: (firstDoyak: Date) => void;

  recentContinuity: number;
  setRecentContinuity: (recentContinuity: number) => void;

  maxContinuity: number;
  setMaxContinuity: (maxContinuity: number) => void;

  shareDoyakCount: number;
  setShareDoyakCount: (shareDoyakCount: number) => void;

  clearToken: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      firstDoyak: null,
      setFirstDoyak: (firstDoyak) => set({ firstDoyak }),

      recentContinuity: 0,
      setRecentContinuity: (recentContinuity) => set({ recentContinuity }),

      maxContinuity: 0,
      setMaxContinuity: (maxContinuity) => set({ maxContinuity }),

      shareDoyakCount: 0,
      setShareDoyakCount: (shareDoyakCount) => set({ shareDoyakCount }),

      isSociallogin: false,
      setisSociallogin: (isSociallogin) => set({ isSociallogin }),

      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),

      memberId: null,
      setMemberId: (memberId) => set({ memberId }),

      aiName: "도약이",
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
          aiName: "도약이",
          exp: 0,
          goalName: null,
          nickname: null,
          profileImage: null,
          firstDoyak: null,
          recentContinuity: 0,
          maxContinuity: 0,
          shareDoyakCount: 0,
        });
        localStorage.removeItem("refreshToken");
      },
    }),
    {
      name: "userInfoStorage",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => key !== "accessToken" && !key.startsWith("set")
          )
        ),
    }
  )
);

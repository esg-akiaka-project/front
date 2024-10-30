// 상태 관리 파일 (예: store.ts)
import { create } from "zustand";

interface UserState {
  profileImage: string | null; // 프로필 이미지 URL
  setProfileImage: (url: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  profileImage: null,
  setProfileImage: (url) => set({ profileImage: url }),
}));

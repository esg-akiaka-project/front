import { create } from "zustand";
interface UserState {
  isLogin: boolean;
  logIn: (value: number) => void;
  logOut: () => void;
  cnt: number;
}

const useLoginStore = create<UserState>((set) => ({
  cnt: 0,
  isLogin: false,
  logIn: (value) => set(() => ({ isLogin: true, cnt: value })),
  // 여기에서의 state는 현재 상태 값을 의미

  logOut: () => set(() => ({ isLogin: false, cnt: 0 })),
}));

export default useLoginStore;

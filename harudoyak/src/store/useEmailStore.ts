import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EmailProps {
  isVerified: boolean;
  setVerified: (verified: boolean) => void;
}

const useEmailStore = create<EmailProps>()(
  persist(
    (set) => ({
      isVerified: false,
      setVerified: (verified: boolean) => set({ isVerified: verified }),
    }),
    {
      name: "emailVerification", // 로컬스토리지에 저장될 키 이름
    }
  )
);

export default useEmailStore;

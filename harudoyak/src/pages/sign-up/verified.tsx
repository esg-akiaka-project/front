import { useEffect } from "react";
import { useRouter } from "next/router";
import useEmailStore from "@/src/store/useEmailStore";

const Verified: React.FC = () => {
  const router = useRouter();
  const { email, isVerified, expireDate } = router.query;
  const setVerified = useEmailStore((state) => state.setVerified);

  useEffect(() => {
    if (!router.isReady) return; // 쿼리가 준비되었는지 확인
    if (email && isVerified === "true" && expireDate) {
      const currentDate = new Date();
      const expirationDate = new Date(expireDate as string);

      if (currentDate <= expirationDate) {
        setVerified(true); // Zustand 상태 업데이트
      }
    }
    window.close();
  }, [router.isReady, email, isVerified, expireDate, setVerified]);

  return <div>이메일 인증 중입니다...</div>;
};

export default Verified;

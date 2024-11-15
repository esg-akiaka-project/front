import { useEffect } from "react";
import { useRouter } from "next/router";

const Verified: React.FC = () => {
  const router = useRouter();
  const { email, isVerified, expireDate } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    if (email && isVerified === "true" && expireDate) {
      const currentDate = new Date();
      const expirationDate = new Date(expireDate as string);

      if (currentDate <= expirationDate) {
        localStorage.setItem(
          "emailVerification",
          JSON.stringify({ isVerified: true })
        );
      }
    }
    setTimeout(() => {
      window.close();
    }, 1000);
  }, [router.isReady, email, isVerified, expireDate]);

  return <div>이메일 인증 중입니다...</div>;
};

export default Verified;

import { useEffect } from "react";
import { useRouter } from "next/router";

const Verified: React.FC = () => {
  const router = useRouter();
  const { email, isVerified, expireDate } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    console.log("verified 페이지 입장");
    if (email && isVerified === "true" && expireDate) {
      // 만료 시간을 체크하고 로컬 스토리지에 인증 정보를 저장
      const currentDate = new Date();
      const expirationDate = new Date(expireDate as string);

      if (currentDate <= expirationDate) {
        localStorage.setItem("emailVerified", "true");
        localStorage.setItem("verifiedEmail", String(email));

        // 부모 창으로 인증 완료 메시지 전송
        window.opener?.postMessage(
          { type: "EMAIL_VERIFIED", email: email },
          window.location.origin
        );
      }
    }
  }, [router.isReady, email, isVerified, expireDate]);

  return <div>이메일 인증 중입니다...</div>;
};

export default Verified;

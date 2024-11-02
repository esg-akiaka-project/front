import { useEffect } from "react";
import { useRouter } from "next/router";

const Verified: React.FC = () => {
  const router = useRouter();
  const { email } = router.query;

  useEffect(() => {
    if (email) {
      localStorage.setItem("emailVerified", "true");
      localStorage.setItem("verifiedEmail", String(email));

      window.close();
    }
  }, [email]);

  return <p>이메일 인증이 완료되었습니다. 회원가입 페이지로 돌아갑니다...</p>;
};

export default Verified;

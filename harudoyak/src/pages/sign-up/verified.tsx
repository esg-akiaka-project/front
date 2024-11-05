import { useEffect } from "react";
import { useRouter } from "next/router";

const Verified: React.FC = () => {
  const router = useRouter();
  const { email } = router.query;
  // todo: 이 화면에서 백엔드로 만료시간을 get요청 얻은 후,
  // 만료기간이 넘었다면 다시 인증을 요구하는 로직, 기간내라면 인증 완료 로직
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

import React, { useEffect } from "react";
import { useUserStore } from "../store/useUserStore"; // zustand 스토어 가져오기
import SocialLogin from "../components/login/SocialLogin"; // SocialLogin 컴포넌트 가져오기
import { useRouter } from "next/router";
import { kakaoLogin, googleLogin } from "../apis/authApi";
const kakaoRestApiKey: string =
  process.env.NEXT_PUBLIC_REST_API_KEY || "default_kakao_api_key";
const googleClientId: string =
  process.env.REACT_APP_GOOGLE_CLIENT_ID || "default_google_client_id";
const redirectUrl: string =
  process.env.NEXT_PUBLIC_REDIRECT_URI || "default_redirect_url";

export default function Auth() {
  const router = useRouter();
  const {
    setisSociallogin,
    setAccessToken,
    setAiName,
    setMemberId,
    setGoalName,
    setProfileImage,
    setNickname,
    setExp,
    setRecentContinuity,
    setFirstDoyak,
    setMaxContinuity,
    setShareDoyakCount,
    setEEmail,
  } = useUserStore();

  useEffect(() => {
    // 클라이언트 사이드에서만 window 객체 사용
    if (typeof window !== "undefined") {
      const params = new URL(window.location.href).searchParams;
      const kakaoCode = params.get("code"); // Kakao 인가 코드
      const googleCode = params.get("google_code"); // Google 인가 코드

      const getKakaoToken = async () => {
        if (!kakaoCode) {
          console.error("Kakao authorization code is missing");
          return; // code가 없을 경우 함수 종료
        }

        try {
          const response = await kakaoLogin(kakaoCode);
          console.log(response);
          const { member, level, file } = response;

          setisSociallogin(true);
          setMemberId(member.memberId);
          setAiName(member.aiNickname);
          setGoalName(member.goalName);
          setProfileImage(file?.filePathName || null);
          setNickname(member.nickname);

          setExp(level.point);

          setRecentContinuity(level.sharedotakCount);
          setFirstDoyak(level.firstDate);
          setMaxContinuity(level.maxContinuity);
          setShareDoyakCount(level.shareDoyakCount);

          localStorage.setItem("refreshToken", member.refreshToken);

          router.push("/");
        } catch (error) {
          console.log(error);
        }
      };

      const getGoogleToken = async () => {
        if (!googleCode) {
          console.error("Google authorization code is missing");
          return; // code가 없을 경우 함수 종료
        }

        const payload = new URLSearchParams({
          code: googleCode,
          client_id: googleClientId,
          redirect_url: redirectUrl,
          grant_type: "authorization_code",
        }).toString();

        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: payload,
          });

          const data = await response.json();
          if (response.ok) {
            setAccessToken(data.access_token); // Google 액세스 토큰 설정
            setisSociallogin(true); // 소셜 로그인 상태 업데이트
            console.log("Google 로그인 성공:", data);
          } else {
            console.error("Google 로그인 실패:", data);
          }
        } catch (err) {
          console.error("에러 발생:", err);
        }
      };

      if (kakaoCode) {
        getKakaoToken(); // Kakao 인가 코드가 있을 경우 Kakao 토큰 요청
      }

      if (googleCode) {
        getGoogleToken(); // Google 인가 코드가 있을 경우 Google 토큰 요청
      }
    }
  }, [setAccessToken, setisSociallogin]);

  return (
    <div>
      {true ? ( // 실제 인가 코드 여부에 따라 조건 수정 필요
        <div>로그인 진행중입니다</div>
      ) : (
        <SocialLogin />
      )}
    </div>
  );
}

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
      const code = params.get("code"); // Google 인가 코드
      const state = params.get("state");

      console.log(state);
      const getKakaoToken = async () => {
        if (!code) {
          console.error("Kakao authorization code is missing");
          return; // code가 없을 경우 함수 종료
        }

        try {
          const response = await kakaoLogin(code);

          const { member, level, file } = response;

          setisSociallogin(true);
          setMemberId(member.memberId);
          setAiName(member.aiNickname);
          setGoalName(member.goalName);
          setProfileImage(file?.filePathName || null);
          setNickname(member.nickname);

          setExp(level.point);

          console.log(level);
          setRecentContinuity(level.recentContinuity);
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
        if (!code) {
          console.error("Google authorization code is missing");
          return; // code가 없을 경우 함수 종료
        }
        try {
          const response = await googleLogin(code);
          const { member, level, file } = response;

          setisSociallogin(true);
          setMemberId(member.memberId);
          setAiName(member.aiNickname);
          setGoalName(member.goalName);
          setProfileImage(file?.filePathName || null);
          setNickname(member.nickname);

          setExp(level.point);

          setRecentContinuity(level.recentContinuity);
          setFirstDoyak(level.firstDate);
          setMaxContinuity(level.maxContinuity);
          setShareDoyakCount(level.shareDoyakCount);

          localStorage.setItem("refreshToken", member.refreshToken);

          router.push("/");
        } catch (error) {
          console.log(error);
        }
      };

      if (state == "kakao") {
        getKakaoToken(); // Kakao 인가 코드가 있을 경우 Kakao 토큰 요청
      } else {
        getGoogleToken();
      }
    }
  }, [setAccessToken, setisSociallogin]);

  return (
    <div>
      {/* {true ? ( // 실제 인가 코드 여부에 따라 조건 수정 필요
        <div>로그인 진행중입니다</div>
      ) : (
        <SocialLogin />
      )} */}
    </div>
  );
}

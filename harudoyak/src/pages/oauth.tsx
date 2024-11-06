import React, { useEffect } from "react";
import { useUserStore } from "../store/useUserStore"; // zustand 스토어 가져오기
import SocialLogin from "../components/login/SocialLogin"; // SocialLogin 컴포넌트 가져오기

<<<<<<< HEAD
const REST_API_KEY = "325f256af9baeeb0dddb1664a61cc7c6"; // Kakao API Key
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // 구글 클라이언트 ID
const REDIRECT_URI = "http://localhost:3000/oauth"; // 리다이렉트 URI
const CLIENT_SECRET = "YOUR_CLIENT_SECRET"; // Kakao Client Secret (필요 시 사용)
=======
const REST_API_KEY = '325f256af9baeeb0dddb1664a61cc7c6'; // Kakao API Key
const GOOGLE_CLIENT_ID = '385470385560-cfsvbff5a4iv2e01hio2r4obekflg1qt.apps.googleusercontent.com'; // 구글 클라이언트 ID
const REDIRECT_URI = 'http://localhost:3000/oauth'; // 리다이렉트 URI
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET'; // Kakao Client Secret (필요 시 사용)
>>>>>>> d23bfef58f399d0ad8f51e9983d412915b2cbbf9

export default function Auth() {
  const { setisSociallogin, setAccessToken } = useUserStore(); // zustand 스토어 사용

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

        const payload = new URLSearchParams({
          grant_type: "authorization_code",
          client_id: REST_API_KEY,
          redirect_uri: REDIRECT_URI,
          code: kakaoCode,
          client_secret: CLIENT_SECRET,
        }).toString();

        try {
          const response = await fetch("https://kauth.kakao.com/oauth/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: payload,
          });

          const data = await response.json();
          if (response.ok) {
            setAccessToken(data.access_token); // Kakao 액세스 토큰 설정
            setisSociallogin(true); // 소셜 로그인 상태 업데이트
            // refresh localstorage저장, memberId
            //
            console.log("Kakao 로그인 성공:", data);
          } else {
            console.error("Kakao 로그인 실패:", data);
          }
        } catch (err) {
          console.error("에러 발생:", err);
        }
      };

      const getGoogleToken = async () => {
        if (!googleCode) {
          console.error("Google authorization code is missing");
          return; // code가 없을 경우 함수 종료
        }

        const payload = new URLSearchParams({
          code: googleCode,
          client_id: GOOGLE_CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
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
        <div>로그인 진행중입니다..</div>
      ) : (
        <SocialLogin />
      )}
    </div>
  );
}

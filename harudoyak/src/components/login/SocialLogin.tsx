import React from "react";
import styled from "styled-components";
import Image from "next/image";

const SocialWrapper = styled.div`
  text-align: center;
  margin-top: 1.5rem;
`;

const SocialTitle = styled.p`
  color: var(--CoolGray-90, #21272a);
  text-align: center;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const SocialButton = styled.button`
  padding: 0rem 0rem;
  border: 0px solid;
  margin: 0 0.5rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  width: 120px;
  height: 24px;

  &:first-child {
    background-color: #fff;
    color: #333;
  }
`;

const IconWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-right: 8px;
  align-items: center;
`;

const SocialLogin: React.FC = () => {
  const kakaoRestApiKey = process.env.NEXT_PUBLIC_REST_API_KEY; // Kakao API Key
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID; // 구글 클라이언트 ID
  const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URI; // 리다이렉트 URI

  console.log(redirectUrl);
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUrl}&response_type=code&scope=email profile&state=google`;
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApiKey}&redirect_uri=${redirectUrl}&response_type=code&state=kakao`;

  const handleGoogleLogin = () => {
    window.location.href = googleLoginUrl;
  };

  const handleKakaoLogin = () => {
    window.location.href = kakaoLoginUrl;
  };

  return (
    <SocialWrapper>
      <SocialTitle>간편 로그인</SocialTitle>
      <SocialButton onClick={handleGoogleLogin}>
        <IconWrapper>
          <Image
            src="/assets/log-in/google.svg"
            alt="Google Icon"
            width={120}
            height={120}
          />
        </IconWrapper>
      </SocialButton>
      <SocialButton onClick={handleKakaoLogin}>
        <IconWrapper>
          <Image
            src="/assets/log-in/kakao.png"
            alt="Kakao Icon"
            width={120}
            height={120}
          />
        </IconWrapper>
      </SocialButton>
    </SocialWrapper>
  );
};

export default SocialLogin;

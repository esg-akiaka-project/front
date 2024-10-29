import React from 'react';
import styled from 'styled-components';

const SocialWrapper = styled.div`
  text-align: center;
  margin-top: 1.5rem;
`;

const SocialTitle = styled.p`
  color: var(--CoolGray-90, #21272A);
  text-align: center;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const SocialButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 24px;
  border: 2px solid #19191B;
  margin: 0 0.5rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;

  &:first-child {
    background-color: #fff;
    color: #333;
  }
`;

const SocialLogin: React.FC = () => {
  const googleClientId = '177550247677-ssg0lbd68vj83nerpjaekrcvmjffqjnb.apps.googleusercontent.com';
  const kakaoRestApiKey = 'YOUR_KAKAO_REST_API_KEY';
  const redirectUri = 'YOUR_REDIRECT_URI';

  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApiKey}&redirect_uri=${redirectUri}&response_type=code`;

  const handleGoogleLogin = () => {
    window.location.href = googleLoginUrl;
  };

  const handleKakaoLogin = () => {
    window.location.href = kakaoLoginUrl;
  };

  return (
    <SocialWrapper>
      <SocialTitle>간편 로그인</SocialTitle>
      <SocialButton onClick={handleGoogleLogin}>Google</SocialButton>
      <SocialButton onClick={handleKakaoLogin}>Kakao</SocialButton>
    </SocialWrapper>
  );
};

export default SocialLogin;

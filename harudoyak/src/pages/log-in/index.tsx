//<root화 되어 있는 component화 되어 있지 않은 index. tsx>//

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

// Root 컨테이너 스타일링
const Root = styled.div`
  min-height: 80vh;
  padding: 0;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 63px;

  @media screen and (max-width: 768px) {
    // 모바일 환경
    margin-left: 1.44rem;
    margin-right: 1.44rem;
  }
  @media screen and (min-width: 768px) {
    // PC 환경
    margin-left: 1.44rem;
    margin-right: 1.44rem;
  }
`;

// Logo 컴포넌트
const LogoText = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 2rem;
`;

const Logo: React.FC = () => {
  return <LogoText>하루 도약 로고</LogoText>;
};

// InputField 컴포넌트
interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
}

const InputFieldWrapper = styled.div`
  width: 391px;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, type = 'text' }) => {
  return (
    <InputFieldWrapper>
      <Label>{label}</Label>
      <Input type={type} placeholder={placeholder} />
    </InputFieldWrapper>
  );
};

// LoginButton 컴포넌트
const Button = styled.button`
  width: 361px;
  height: 24px;
  padding: 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #3C7960;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  margin-bottom: 1rem;
  text-align: center;

  &:hover {
    background-color: #3C7960;
  }
`;

const LoginButton: React.FC = () => {
  return <Button>로그인</Button>;
};

// LinkOptions 컴포넌트
const LinksWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 1.5rem;
`;

const LinkText = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const LinkOptions: React.FC = () => {
  const router = useRouter();

  return (
    <LinksWrapper>
      <LinkText onClick={() => router.push('/sign-up/email-certification-and-information-regist')}>회원가입</LinkText>
      <LinkText>아이디 찾기</LinkText>
      <LinkText>비밀번호 찾기</LinkText>
    </LinksWrapper>
  );
};

// SocialLogin 컴포넌트
const SocialWrapper = styled.div`
  text-align: center;
  margin-top: 1.5rem;
`;

const SocialTitle = styled.p`
  font-size: 16px;
  color: #21272A;
  margin-bottom: 1rem;
`;

const SocialButton = styled.button`
  height: 12px;
  width: 70px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: 2px solid #19191b;
  border-radius: 20px;
  margin: 0 0.5rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:first-child {
    background-color: #F2F6F3;
    color: #19191B;
  }

  &:last-child {
    background-color: #F2F6F3;
    color: #19191B;
  }
`;

const SocialLogin: React.FC = () => {
  return (
    <SocialWrapper>
      <SocialTitle>간편 로그인</SocialTitle>
      <SocialButton>Google</SocialButton>
      <SocialButton>KaKao</SocialButton>
    </SocialWrapper>
  );
};

// LoginPage 컴포넌트 (메인 페이지 컴포넌트)
const LoginPage: React.FC = () => {
  return (
    <Root>
      <Logo />
      <InputField label="아이디" placeholder="아이디" />
      <InputField label="비밀번호" placeholder="비밀번호" type="password" />
      <LoginButton />
      <LinkOptions />
      <SocialLogin />
    </Root>
  );
};

export default LoginPage;

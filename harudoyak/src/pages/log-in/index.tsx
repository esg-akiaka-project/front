import React from 'react';
import styled from 'styled-components';
import Logo from '../../components/Logo';
import InputField from '../../components/login/InputField';
import LoginButton from '../../components/login/LoginButton';
import LinkOptions from '../../components/login/LinkOptions';
import SocialLogin from '../../components/login/SocialLogin';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
`;

const LoginPage: React.FC = () => {
  return (
    <Container>
      <Logo />
      <InputField label="아이디" placeholder="아이디" />
      <InputField label="비밀번호" placeholder="비밀번호" type="password" />
      <LoginButton />
      <LinkOptions />
      <SocialLogin />
    </Container>
  );
};

export default LoginPage;

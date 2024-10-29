import React from 'react';
import styled from 'styled-components';
import Logo from '../../components/Logo';
import InputField from '../../components/login/InputField';
import LoginButton from '../../components/login/LoginButton';
import LinkOptions from '../../components/login/LinkOptions';
import SocialLogin from '../../components/login/SocialLogin';
import Root from '../../components/common/Root';

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




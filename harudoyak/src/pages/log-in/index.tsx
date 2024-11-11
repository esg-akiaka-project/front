import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../../components/Logo";
import InputField from "../../components/login/InputField";
import LoginButton from "../../components/login/LoginButton";
import LinkOptions from "../../components/login/LinkOptions";
import SocialLogin from "../../components/login/SocialLogin";
import FirstSeperator from "../../components/login/FirstSeperator";
import SecondSeperator from "../../components/login/SecondSeperator";
import Root from "../../style/Root";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <Root>
      <Logo />
      <Heading1></Heading1>
      <InputField
        label="이메일"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        label="비밀번호"
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Heading4></Heading4>
      <LoginButton email={email} password={password} />
      <Heading2></Heading2>
      <FirstSeperator></FirstSeperator>
      <Heading2></Heading2>
      <LinkOptions />
      <Heading3></Heading3>
      <SocialLogin />
      <SecondSeperator></SecondSeperator>
    </Root>
  );
};

export default LoginPage;

const Heading1 = styled.h1`
  font-size: 1.44rem;
  color: var(--main-green);
  margin-bottom: 36px;
`;
const Heading2 = styled.h2`
  font-size: 1.56rem;
  color: var(--sub-green2);
  margin-bottom: 14px;
`;

const Heading3 = styled.h3`
  font-size: 1.56rem;
  color: var(--sub-green2);
  margin-bottom: 12px;
  margin-top: 28px;
`;

const Heading4 = styled.h4`
  font-size: 1.56rem;
  color: var(--sub-green2);
  margin-bottom: 12px;
  margin-top: 14px;
`;

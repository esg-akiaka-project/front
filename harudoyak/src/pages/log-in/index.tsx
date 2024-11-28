import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Logo from "../../components/Logo";
import InputField from "../../components/login/InputField";
import LoginButton from "../../components/login/LoginButton";
import LinkOptions from "../../components/login/LinkOptions";
import SocialLogin from "../../components/login/SocialLogin";
import FirstSeperator from "../../components/login/FirstSeperator";
import SecondSeperator from "../../components/login/SecondSeperator";
import Root from "../../style/Root";
import { Login } from "@/src/apis/authApi";
import { useUserStore } from "@/src/store/useUserStore";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    setAccessToken,
    setAiName,
    setGoalName,
    setProfileImage,
    setMemberId,
    setExp,
    setNickname,
    setRecentContinuity,
    setFirstDoyak,
    setMaxContinuity,
    setShareDoyakCount,
    setEEmail,
  } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await Login({ email, password });

      if (response.status === 200) {
        const { member, level, file } = response.data;

        const accessToken = response.headers["authorization"].split(" ")[1];
        console.log(response.data);
        console.log(member);
        console.log(level);
        console.log(file);
        setAccessToken(accessToken);

        setMemberId(member.memberId);
        setAiName(member.aiNickname);
        setGoalName(member.goalName);
        setProfileImage(file?.filePathName || null);
        setNickname(member.nickname);
        setEEmail(email);
        setExp(level.point);

        setRecentContinuity(level.recentContinuity);
        setFirstDoyak(level.firstDate);
        setMaxContinuity(level.maxContinuity);
        setShareDoyakCount(level.shareDoyakCount);

        localStorage.setItem("refreshToken", member.refreshToken);

        router.push("/");
      } else {
        console.error("로그인 실패:", response);
      }
    } catch (error) {
      console.error("로그인 중 에러 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Root>
      <Logo />
      <Heading1></Heading1>
      <Form onSubmit={handleSubmit}>
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
        <LoginButton isLoading={isLoading} disabled={!email || !password} />
      </Form>
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

const Form = styled.form`
  width: 100%;
`;

// Heading 스타일은 그대로 유지

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

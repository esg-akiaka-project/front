import React, { useState } from "react";
import { useRouter } from "next/router";
import Steppers from "@/src/components/tosagreement/Steppers";
import { StepperItemProps } from "../../types/CommonTypes";
import CancelButton from "@/src/components/tosagreement/CancelButton";
import SignUpButton from "@/src/components/buttons/SignUpButton";
import SignUpTitle from "@/src/components/tosagreement/SignUpTitle";
import styled from "styled-components";

const EmailWrapper = styled.div`
  // justify-content: center;
  display: flex;
  align-items: center;
  margin: 0% 0 5% 5%;
`;
const StyledInput = styled.input`
  border-radius: 25px;
  // border: white;
  width: 90%;
  height: ;
`;
const StyledInputTitle = styled.p`
  margin: 10% 0 1% 5%;
  font-weight: bold;
`;

const NicknameWrapper = styled.div`
  display: flex;
  justify-content: center;
  // align-items: center;
  margin: 0 10% 0 5%;
`;
const EmailCertificationAndInformationRegist: React.FC = () => {
  const router = useRouter();
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const verifyEmail = () => {
    // 이메일 인증 로직 (백엔드쪽에 api 요청)
    // 인증 통과 시 setEmailVerified(true) 호출
    console.log("이메일 인증 요청: ", email);

    // 실제로는 백엔드에서 성공 응답을 받은 후에 호출해야됨
    // 일단은 무조건 true가 오게함
    setEmailVerified(true);
  };

  const gotoSignupCompletePage = () => {
    router.push("/sign-up/signup-complete");
  };

  const steps: StepperItemProps[] = [
    { stepNumber: 1, stepName: "약관동의", status: "completed" },
    { stepNumber: 2, stepName: "인증 및 등록", status: "completed" },
    { stepNumber: 3, stepName: "가입완료", status: "default" },
  ];

  return (
    <>
      <CancelButton />
      <SignUpTitle title={"인증 및 등록"}></SignUpTitle>

      <Steppers steps={steps} />
      <StyledInputTitle>이메일</StyledInputTitle>
      <EmailWrapper>
        <StyledInput
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일 주소"
        />
      </EmailWrapper>
      {!emailVerified ? (
        <SignUpButton data={!!email} onClick={verifyEmail}>
          이메일 인증
        </SignUpButton>
      ) : (
        <div>
          <StyledInputTitle>닉네임</StyledInputTitle>
          <NicknameWrapper>
            <StyledInput
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="닉네임"
            />
            <button>아이디 중복확인</button>
          </NicknameWrapper>
          <div>
            <StyledInput
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호"
            />
            <StyledInput
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="비밀번호 확인"
            />
          </div>
          <SignUpButton
            data={
              nickname.length > 0 &&
              password.length > 0 &&
              password === confirmPassword
            }
            onClick={gotoSignupCompletePage}
          >
            가입하기
          </SignUpButton>
        </div>
      )}
    </>
  );
};

export default EmailCertificationAndInformationRegist;

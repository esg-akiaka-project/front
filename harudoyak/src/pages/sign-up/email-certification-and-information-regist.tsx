import React, { useState } from "react";
import { useRouter } from "next/router";
import Steppers from "@/src/components/tosagreement/Steppers";
import { StepperItemProps } from "../../types/CommonTypes";
import CancelButton from "@/src/components/tosagreement/CancelButton";
import SignUpButton from "@/src/components/buttons/SignUpButton";
import SignUpTitle from "@/src/components/tosagreement/SignUpTitle";
import styled from "styled-components";

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

  const CheckDuplicateId = () => {
    console.log("test");
    // 아이디 중복체크 해야함
  };
  const cancelSignUp = () => {
    router.push("/log-in");
  };
  const steps: StepperItemProps[] = [
    { stepNumber: 1, stepName: "약관동의", status: "completed" },
    { stepNumber: 2, stepName: "인증 및 등록", status: "completed" },
    { stepNumber: 3, stepName: "가입완료", status: "default" },
  ];

  return (
    <>
      <CancelButton onClick={cancelSignUp} />
      <SignUpTitle title={"인증 및 등록"}></SignUpTitle>

      <Steppers steps={steps} />
      <StyledInputTitle>이메일</StyledInputTitle>
      <EmailWrapper>
        <StyledInput
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일 주소"
          disabled={emailVerified}
        />
      </EmailWrapper>
      {!emailVerified ? (
        <SignUpButton
          data={!emailVerified}
          onClick={verifyEmail}
          show={!emailVerified}
        >
          이메일 인증
        </SignUpButton>
      ) : (
        <div>
          <StyledInputTitle>닉네임</StyledInputTitle>
          <NicknameWrapper>
            <NicknameInput
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="닉네임"
            />
            <IdDuplicateCheckButton onClick={CheckDuplicateId}>
              아이디 중복확인
            </IdDuplicateCheckButton>
          </NicknameWrapper>
          <StyledInputTitle>비밀번호</StyledInputTitle>
          <EmailWrapper>
            <StyledInput
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호"
            />
          </EmailWrapper>
          <StyledInputTitle>비밀번호 확인</StyledInputTitle>
          <EmailWrapper>
            <StyledInput
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="비밀번호 확인"
            />
          </EmailWrapper>
          <PasswordConfirmCheckTag
            $confirmcheck={password !== confirmPassword}
            $confirmPasswordLength={confirmPassword.length}
          >
            비밀번호가 다릅니다
          </PasswordConfirmCheckTag>
          <SignUpButton
            data={
              nickname.length > 0 &&
              password.length > 0 &&
              password === confirmPassword
            }
            onClick={gotoSignupCompletePage}
            show={true}
          >
            가입하기
          </SignUpButton>
        </div>
      )}
    </>
  );
};

export default EmailCertificationAndInformationRegist;

const EmailWrapper = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  margin: 0% 0% 5% 0%;
`;

const StyledInput = styled.input`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: white;
  width: 90%;
  height: 3rem;
`;

const NicknameInput = styled.input`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: white;
  width: 60%;
  height: 3rem;
`;
const StyledInputTitle = styled.p`
  margin: 10% 5% 1% 5%;
  font-weight: bold;
`;
const IdDuplicateCheckButton = styled.button`
  border-radius: 10px;
  background: #3c7960;
  font-weight: bold;
  color: white;
  width: 35%;
  border: none;
`;
const NicknameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  // align-items: center;
  margin: 0 5% 10% 5%;
`;

const PasswordConfirmCheckTag = styled.p<{
  $confirmcheck: boolean;
  $confirmPasswordLength: number;
}>`
  color: red;
  // padding-top: 0
  margin: 0 0 5% 5%;
  visibility: ${({ $confirmcheck, $confirmPasswordLength }) =>
    $confirmcheck && $confirmPasswordLength > 0 ? "none" : "hidden"};
`;

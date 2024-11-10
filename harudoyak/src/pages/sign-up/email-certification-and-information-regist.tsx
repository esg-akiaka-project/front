import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Steppers from "@/src/components/tosagreement/Steppers";
import { StepperItemProps } from "../../types/CommonTypes";
import CancelButton from "@/src/components/tosagreement/CancelButton";
import SignUpButton from "@/src/components/buttons/SignUpButton";
import SignUpTitle from "@/src/components/tosagreement/SignUpTitle";
import styled from "styled-components";
import Root from "../../style/Root";
import {
  certifyEmail,
  CheckDuplicateNickname,
  CompeleteSignup,
} from "@/src/apis/authApi";

const EmailCertificationAndInformationRegist: React.FC = () => {
  const router = useRouter();
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [nicknameVerified, setnicknameVerified] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  useEffect(() => {
    // window 객체에 메시지 리스너 추가
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return; // 보안 검증: 같은 출처인지 확인

      const { type, email } = event.data;

      if (type === "EMAIL_VERIFIED" && email) {
        setEmailVerified(true);
        setEmail(email);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

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

  // todo: 이메일 인증 로직 다시 확인
  // 실제 로직은 백엔드에 이메일 인증 요청 -> 메일 내의 인증 링크 클릭 -> localstorage 이메일 및 인증여부 등록 이벤트 발생
  // 해당 이벤트를 통해 이메일 인증 확인 후에 로직 실행
  const verifyEmail = async () => {
    // 이메일 인증 로직 (백엔드쪽에 api 요청)
    // 인증 통과 시 setEmailVerified(true) 호출
    console.log("이메일 인증 요청: ", email);
    try {
      const response = await certifyEmail(email);
      console.log("인증 요청 성공 :", response);
    } catch (error) {
      console.log("이메일 인증 요청 실패", error);
    }
    // 실제로는 백엔드에서 성공 응답을 받은 후에 호출해야됨
    // 일단은 무조건 true가 오게함
    setEmailVerified(true);
  };

  const gotoSignupCompletePage = async () => {
    try {
      const response = await CompeleteSignup({
        email: email,
        isVerified: true,
        password: password,
        nickname: nickname,
      });
      console.log("회원가입 완료", response);
      router.push("/sign-up/signup-complete");
    } catch (error) {
      console.log("회원가입 완료 중 오류", error);
    }
  };

  // todo: 닉네임 중복확인 로직 다시 확인!!
  const CheckDuplicateId = async () => {
    console.log("test");
    try {
      const response = await CheckDuplicateNickname(nickname);
      // todo: 닉네임 중복 api 연동 이후, 결과값(t/f)에 따라 중복된 아이디(alert) , 사용가능한 아이디입니다(alert) 처리
      console.log("닉네임 중복 확인 성공", response);
      setnicknameVerified(true);
    } catch (error) {
      console.log("닉네임 중복 확인 실패:", error);
      setnicknameVerified(true); // todo: 임의적으로 둔것, 꼭 지워야 함
    }
  };
  const cancelSignUp = () => {
    router.push("/log-in");
  }; //
  const steps: StepperItemProps[] = [
    { stepNumber: 1, stepName: "약관동의", status: "completed" },
    { stepNumber: 2, stepName: "인증 및 등록", status: "completed" },
    { stepNumber: 3, stepName: "가입완료", status: "default" },
  ];

  return (
    <Root>
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
              닉네임 중복확인
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
              password === confirmPassword &&
              nicknameVerified
            }
            onClick={gotoSignupCompletePage}
            show={true}
          >
            가입하기
          </SignUpButton>
        </div>
      )}
    </Root>
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
  font-size: 0.8rem;
  text-align: center;
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

import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Login } from "@/src/apis/authApi";
import { useUserStore } from "@/src/store/useUserStore";

interface LoginButtonProps {
  email: string;
  password: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ email, password }) => {
  const router = useRouter();
  const {
    setAccessToken,
    setAiName,
    setGoalName,
    setProfileImage,
    setMemberId,
    setExp,
    setNickname,
  } = useUserStore();

  const LoginProcess = async () => {
    try {
      // Login API 호출 시 아이디와 비밀번호 전달
      const response = await Login({ email, password });
      if (response.status === 200) {
        const { member, level, file } = response.data;

        // todo: accessToken (추후에 콘솔을 통해 다시 정리해야함)
        const accessToken = response.headers["authorization"].split(" ")[1];
        setAccessToken(accessToken);

        setMemberId(member.memberId);
        setAiName(member.aiNickname);
        setGoalName(member.goalName);
        setProfileImage(file.filePathName);
        setNickname(member.nickname);
        setExp(level.point);

        localStorage.setItem("refreshToken", member.refreshToken);

        router.push("/");
      } else {
        // 로그인 실패 시 에러 처리
        console.error("로그인 실패:", response.data);
      }
    } catch (error) {
      console.error("로그인 중 에러 발생:", error);
    }
  }; // todo : 추후에 로그인 로직 해야함
  return <Button onClick={LoginProcess}>로그인</Button>;
};

export default LoginButton;

const Button = styled.button`
  border: none;
  display: flex;

  width: 100%;
  height: 48px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 24px;
  background: var(--main-green);

  color: var(--white-from-grayscale);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 16px */
  letter-spacing: 0.5px;

  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    background-color: var(--sub-green1);
  }
`;

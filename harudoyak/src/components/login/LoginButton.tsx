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
    setGoalId,
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
        // 로그인 성공 시 홈 화면으로 이동
        // todo: 전역변수 관리 이후 라우팅 해야함
        // 응답 header : Authorization : Bearer ${accessToken}
        // 응답 body : {
        //        refreshtoken: "string",
        //        memberId: "number",
        //        exp: "number",
        //        ainame: "string",
        //        nickname: "string",
        //        profileimage: "string",
        //        goalId: "string,"
        //     }
        const {
          refreshtoken,
          memberId,
          exp,
          ainame,
          nickname,
          profileimage,
          goalId,
        } = response.data;
        setAccessToken(response.headers["Authorization"].split(" ")[1]); // todo: accessToken (추후에 콘솔을 통해 다시 정리해야함)
        setAiName(ainame);
        setGoalId(goalId);
        setProfileImage(profileimage);
        setMemberId(memberId);
        setExp(exp);
        setNickname(nickname);
        localStorage.setItem("refreshToken", refreshtoken);

        router.push("/");
      } else {
        // 로그인 실패 시 에러 처리
        console.error("로그인 실패:", response.data);
      }
    } catch (error) {
      console.error("로그인 중 에러 발생:", error);
    }
  }; // todo : 추후에 로그인 로직 해야함
  return <Button onClick={() => router.push("/")}>로그인</Button>;
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

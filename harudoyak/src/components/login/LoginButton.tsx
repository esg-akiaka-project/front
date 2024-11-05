import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Login } from "@/src/apis/authApi";

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

const LoginButton: React.FC = () => {
  const router = useRouter();
  const LoginProcess = async () => {}; // todo : 추후에 로그인 로직 해야함
  return <Button onClick={() => router.push("/")}>로그인</Button>;
};

export default LoginButton;

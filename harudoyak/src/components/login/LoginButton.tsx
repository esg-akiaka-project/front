import React from "react";
import styled from "styled-components";

interface LoginButtonProps {
  isLoading: boolean;
  disabled: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ isLoading, disabled }) => {
  return (
    <SubmitButton type="submit" disabled={isLoading || disabled}>
      {isLoading ? "로그인 중..." : "로그인"}
    </SubmitButton>
  );
};

export default LoginButton;

// SubmitButton 스타일은 이전과 동일

const SubmitButton = styled.button`
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
  line-height: 100%;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: var(--sub-green1);
  }

  &:disabled {
    background-color: var(--sub-green2);
    cursor: not-allowed;
  }
`;

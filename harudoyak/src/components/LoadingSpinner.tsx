// src/components/LoadingSpinner.tsx

import React from "react";
import styled, { keyframes } from "styled-components";

const LoadingSpinner: React.FC = () => {
  return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 화면 전체 높이 */
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--main-green); /* 메인 그린 색상 */
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

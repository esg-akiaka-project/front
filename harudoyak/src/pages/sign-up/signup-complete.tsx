import React, { useState } from "react";
import { useRouter } from "next/router";
import Steppers from "@/src/components/tosagreement/Steppers";
import { StepperProps, StepperItemProps } from "../../types/CommonTypes";
import styled, { keyframes } from "styled-components";
import SignUpTitle from "@/src/components/tosagreement/SignUpTitle";

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px #3C7960; }
  50% { box-shadow: 0 0 20px #3C7960; }
  100% { box-shadow: 0 0 5px #3C7960;  }
`;

const heartBeat = keyframes`
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.1);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.1);
  }
  70% {
    transform: scale(1);
  }
`;

const CheckmarkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const Checkmark = styled.div`
  background-color: #3c7960;
  color: white;
  font-size: 4rem;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  animation: ${glowAnimation} 2s infinite, ${heartBeat} 1.5s infinite;
`;

const Emptydiv = styled.div`
  margin-top: 24%;
`;

const Accessptag = styled.p`
  display: flex;
  justify-content: center;
  margin: 20% 0 20% 0;
  font-weight: bold;
  font-size: 120%;
`;
const SignUpComplete: React.FC = () => {
  const router = useRouter();

  const steps: StepperItemProps[] = [
    { stepNumber: 1, stepName: "약관동의", status: "completed" },
    { stepNumber: 2, stepName: "인증 및 등록", status: "completed" },
    { stepNumber: 3, stepName: "가입완료", status: "completed" },
  ];

  const gotoHomePage = () => {
    router.push("/log-in");
  };

  return (
    <>
      <Emptydiv></Emptydiv>
      <SignUpTitle title={"가입 완료"}></SignUpTitle>
      <Steppers steps={steps} />
      <Accessptag>가입이 완료되었습니다!!</Accessptag>
      <CheckmarkWrapper onClick={gotoHomePage}>
        <Checkmark>✔</Checkmark>
        <p>Click!</p>
      </CheckmarkWrapper>
    </>
  );
};

export default SignUpComplete;

import React from "react";
import styled from "styled-components";
// import { StepperProps, StepperItemProps } from "../../types/CommonTypes";
type StepperItemProps = {
  stepNumber: number;
  stepName: string;
  status: "completed" | "active" | "default";
};

type StepperProps = {
  steps: StepperItemProps[];
};

const StepperWrapper = styled.div`
  font-family: Arial;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StepperItem = styled.div<{ status: StepperItemProps["status"] }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  &::before {
    position: absolute;
    content: "";
    border-bottom: 2px solid #ccc;
    width: 100%;
    top: 20px;
    left: -50%;
    z-index: 2;
  }

  &::after {
    position: absolute;
    content: "";
    border-bottom: 2px solid #ccc;
    width: 100%;
    top: 20px;
    left: 50%;
    z-index: 2;
  }

  &:first-child::before {
    content: none;
  }

  &:last-child::after {
    content: none;
  }

  .step-counter {
    position: relative;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    color: white;
    font-weight: bold;
    font-size: 20px;
    border-radius: 50%;
    background: ${({ status }) =>
      status === "completed"
        ? "#3C7960"
        : status === "active"
          ? "#ccc"
          : "#ccc"};
    margin-bottom: 6px;
  }

  ${({ status }) =>
    status === "completed" &&
    `
      &::after {
        position: absolute;
        content: '';
        border-bottom: 2px solid #4bb543;
        width: 100%;
        
        top: 20px;
        left: 50%;
        z-index: 3;
      }
    `}
`;

const StepperName = styled.div<{ status: StepperItemProps["status"] }>`
  font-weight: ${({ status }) => (status === "completed" ? "bold" : "normal")};
`;
const Stepper: React.FC<StepperProps> = ({ steps }) => {
  return (
    <StepperWrapper>
      {steps.map((step) => (
        <StepperItem key={step.stepNumber} status={step.status}>
          <div className="step-counter">{step.stepNumber}</div>
          <StepperName status={step.status}>{step.stepName}</StepperName>
        </StepperItem>
      ))}
    </StepperWrapper>
  );
};

export default Stepper;

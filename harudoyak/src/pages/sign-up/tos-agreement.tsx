import React from "react";
import Steppers from "@/src/components/Steppers";
import { StepperProps, StepperItemProps } from "../types/CommonTypes";

const TosAgreement: React.FC = () => {
  const steps = [
    { stepNumber: 1, stepName: "약관동의", status: "completed" },
    { stepNumber: 2, stepName: "인증 및 등록", status: "default" },
    { stepNumber: 3, stepName: "가입완료", status: "default" },
  ];
  return (
    <>
      <p>약관 동의</p>
      <Steppers steps={steps} />
    </>
  );
};

export default TosAgreement;

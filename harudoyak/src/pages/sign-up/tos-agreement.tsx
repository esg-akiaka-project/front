import React, { useState } from "react";
import { useRouter } from "next/router";
import Steppers from "@/src/components/tosagreement/Steppers";
import { StepperProps, StepperItemProps } from "../../types/CommonTypes";
import CancelButton from "@/src/components/tosagreement/CancelButton";
import SignUpButton from "@/src/components/buttons/SignUpButton";
import SignUpTitle from "@/src/components/tosagreement/SignUpTitle";

const TosAgreement: React.FC = () => {
  const router = useRouter();
  const [allcheck, setallcheck] = useState<boolean>(false);
  const [termsCheck, setTermsCheck] = useState<boolean>(false);
  const [privacyCheck, setPrivacyCheck] = useState<boolean>(false);

  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setallcheck(checked);
    setTermsCheck(checked);
    setPrivacyCheck(checked);
  };

  const handleTermsCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setTermsCheck(checked);
    setallcheck(checked && privacyCheck);
  };

  const handlePrivacyCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setPrivacyCheck(checked);
    setallcheck(checked && termsCheck);
  };
  const gotoEmailCertPage = () => {
    router.push("/sign-up/email-certification-and-information-regist");
  };
  const steps: StepperItemProps[] = [
    { stepNumber: 1, stepName: "약관동의", status: "completed" },
    { stepNumber: 2, stepName: "인증 및 등록", status: "default" },
    { stepNumber: 3, stepName: "가입완료", status: "default" },
  ];

  return (
    <>
      <CancelButton />
      <SignUpTitle title={"약관 동의"}></SignUpTitle>

      <Steppers steps={steps} />

      <div>
        <input type="checkbox" checked={allcheck} onChange={handleAllCheck} />
        <label>이용약관, 개인정보 수집 및 이용에 모두 동의합니다.</label>
      </div>

      <div>
        <input
          type="checkbox"
          checked={termsCheck}
          onChange={handleTermsCheck}
        />
        <label>이용약관 동의 (필수)</label>
      </div>

      <div>
        <input
          type="checkbox"
          checked={privacyCheck}
          onChange={handlePrivacyCheck}
        />
        <label>개인정보 수집 및 이용 동의 (필수)</label>
      </div>

      <SignUpButton data={allcheck} onClick={gotoEmailCertPage}>
        약관 동의
      </SignUpButton>
    </>
  );
};

export default TosAgreement;

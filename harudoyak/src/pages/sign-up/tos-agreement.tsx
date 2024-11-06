import React, { useState } from "react";
import { useRouter } from "next/router";
import Steppers from "@/src/components/tosagreement/Steppers";
import { StepperItemProps } from "../../types/CommonTypes";
import CancelButton from "@/src/components/tosagreement/CancelButton";
import SignUpButton from "@/src/components/buttons/SignUpButton";
import SignUpTitle from "@/src/components/tosagreement/SignUpTitle";
import styled from "styled-components";

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
  const cancelSignUp = () => {
    router.push("/log-in");
  };
  const steps: StepperItemProps[] = [
    { stepNumber: 1, stepName: "약관동의", status: "completed" },
    { stepNumber: 2, stepName: "인증 및 등록", status: "default" },
    { stepNumber: 3, stepName: "가입완료", status: "default" },
  ];

  return (
    <>
      <CancelButton onClick={cancelSignUp} />
      <SignUpTitle title={"약관 동의"}></SignUpTitle>

      <Steppers steps={steps} />

      <CheckboxWrapper>
        <AllCheckWrapper>
          <StyledCheckbox checked={allcheck} onChange={handleAllCheck} />
          <AllCheckLabel>
            이용약관, 개인정보 수집 및 이용에 동의합니다.
          </AllCheckLabel>
        </AllCheckWrapper>

        <TermsSection>
          <div>
            <StyledCheckbox checked={termsCheck} onChange={handleTermsCheck} />
            <label>이용약관 동의 (필수)</label>
          </div>
          <TermsWrapper>
            <TermsContent>
              <h3>이용약관</h3>
              <p>
                여기에는 서비스 이용약관에 대한 내용이 포함됩니다. 이용약관은
                사용자가 서비스를 어떻게 사용할 수 있는지에 대한 규칙을
                정의하고, 사용자의 권리와 의무, 그리고 서비스 제공자의 책임을
                명시합니다.
              </p>
              <p>
                예를 들어, 사용자가 서비스를 악의적으로 사용하지 않아야 하며,
                서비스 제공자는 서비스를 중단할 수 있는 권리가 있다는 등의
                조항이 포함될 수 있습니다.
              </p>
              <p>
                이용약관은 법적 보호를 제공하기 때문에 사용자는 해당 약관을
                꼼꼼하게 읽고 동의해야 합니다. 이러한 약관은 회사의 정책, 사용자
                데이터 보호, 그리고 서비스 이용과 관련된 다른 중요한 정보를
                포함할 수 있습니다.
              </p>
            </TermsContent>
          </TermsWrapper>
        </TermsSection>

        <TermsSection>
          <div>
            <StyledCheckbox
              checked={privacyCheck}
              onChange={handlePrivacyCheck}
            />
            <label>개인정보 수집 및 이용 동의 (필수)</label>
          </div>
          <TermsWrapper>
            <TermsContent>
              <h3>개인정보 수집 및 이용</h3>
              <p>
                본 서비스는 사용자의 개인정보를 안전하게 관리하며, 개인정보
                수집, 이용, 보관 및 폐기에 관한 법률에 따라 사용자의 데이터를
                보호합니다. 개인정보는 서비스 제공 및 품질 향상을 위해
                사용됩니다.
              </p>
              <p>
                개인정보에는 사용자의 이름, 이메일 주소, 연락처 등 서비스 제공에
                필요한 정보가 포함됩니다. 사용자는 언제든지 개인정보의 수집 및
                이용에 대한 동의를 철회할 수 있으며, 이 경우 서비스 이용이
                제한될 수 있습니다.
              </p>
              <p>
                개인정보의 수집 목적, 보관 기간, 보호 조치 등 구체적인 사항은 본
                약관을 통해 안내됩니다. 서비스 제공자는 개인정보를 제3자에게
                제공하지 않으며, 법적 요구가 있을 경우에만 이에 응합니다.
              </p>
            </TermsContent>
          </TermsWrapper>
        </TermsSection>
      </CheckboxWrapper>

      <SignUpButton data={allcheck} onClick={gotoEmailCertPage} show={true}>
        약관 동의
      </SignUpButton>
    </>
  );
};

export default TosAgreement;

// 스타일 정의
const TermsWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;

  height: 150px;
  overflow-y: scroll;
  background-color: #f9f9f9;
`;

const TermsContent = styled.div`
  padding: 10px;
`;

const CheckboxWrapper = styled.div`
  margin-bottom: 20px;
  margin: 10px 20px; /* 좌우 여백 추가 */
`;

const TermsSection = styled.div`
  margin-bottom: 20px;
`;

const AllCheckWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const AllCheckLabel = styled.label`
  font-size: 1rem;
  font-weight: bold;
  // margin-left: 1px;
`;
const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  transform: scale(1.5);
  margin-right: 10px;
`;

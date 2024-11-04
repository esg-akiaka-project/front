import React from "react";
import Root from "../../style/Root";
import UndoAndPageName from "@/src/components/mypage/UndoAndPageName";
import styled from "styled-components";

const AiNameEdit: React.FC = () => {
  return (
    <Root>
      <UndoAndPageName pageName="AI Info" />
      <ExplainpTag>
        내 하루도약에 피드백과 응원을 해주는 AI의 이름을 변경하세요.
      </ExplainpTag>

      <FormContainer>
        <Label>이름</Label>
        <StyledInput placeholder="조이..." maxLength={8} />
        <CharLimitText>2~8자 이하</CharLimitText>
        <SaveButton>저장</SaveButton>
        {/* 이 버튼도 전역상태관리에 저장한 후에 백엔드로 보내줘야함 */}
      </FormContainer>
    </Root>
  );
};

export default AiNameEdit;

const ExplainpTag = styled.p`
  text-align: center;
  font-size: 0.8rem;
  color: #a5cbbc;
  margin-top: 1.5rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const Label = styled.label`
  width: 90%;
  text-align: left;
  font-size: 1rem;
  font-weight: bold;
  color: grey;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  width: 90%;
  height: 3rem;
  padding-left: 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 0.5rem;
`;

const CharLimitText = styled.p`
  font-size: 0.8rem;
  color: grey;
  margin-top: 0;
  margin-bottom: 1.5rem;
  text-align: left;
  display: flex;
  width: 90%;
`;

const SaveButton = styled.button`
  width: 60%;
  height: 3rem;
  background-color: #3c7960;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  text-align: center;
`;

import React, { useState } from "react";
import Root from "../../style/Root";
import UndoAndPageName from "@/src/components/mypage/UndoAndPageName";
import styled from "styled-components";
import { useUserStore } from "@/src/store/useUserStore";
import { changeAiname } from "../../apis/authApi";
import { useRouter } from "next/router";
import Modal from "@/src/components/mypage/Modal";

const AiNameEdit: React.FC = () => {
  const router = useRouter();
  const { aiName, setAiName } = useUserStore();
  const [newAiname, setNewAiname] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const originaiName = aiName === null ? "ai이름 없음" : aiName;

  const handleAiNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAiname(e.target.value);
  };

  const changeAi = async () => {
    try {
      await changeAiname(newAiname);
      setAiName(newAiname);
      setModalMessage("AI 이름이 성공적으로 변경되었습니다.");
      setIsModalOpen(true);
      router.back();
    } catch (error) {
      console.log(error);
    }
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Root>
      <UndoAndPageName pageName="AI Info" />
      <ExplainpTag>
        내 하루도약에 피드백과 응원을 해주는 AI의 이름을 변경하세요.
      </ExplainpTag>

      <FormContainer>
        <Label>이름</Label>
        <StyledInput
          placeholder={originaiName}
          maxLength={8}
          value={newAiname}
          onChange={handleAiNickname}
        />
        <CharLimitText>2~8자 이하</CharLimitText>
        <SaveButton onClick={changeAi}>저장</SaveButton>
      </FormContainer>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <Title>알림</Title>
        <Description>{modalMessage}</Description>
        <SubmitButton onClick={handleModalClose}>확인</SubmitButton>
      </Modal>
    </Root>
  );
};

export default AiNameEdit;

const Title = styled.h2`
  color: var(--main-green);
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  color: var(--gray-from-grayscale);
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 3rem;
  background: var(--main-green);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.5rem;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:disabled {
    background: var(--sub-green2);
    cursor: not-allowed;
  }
`;

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

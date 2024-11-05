// 로그인 이후, ai 이름 및 목표를 설정하지 않았을때 뜨는 화면
// 설정 이후에는 뜨지않음, 모달로 할 예정
// todo:
import React, { useState } from "react";
import styled from "styled-components";

interface BeginningSettingProps {
  onSave: (name: string, goal: string) => void;
}

const BeginningSetting: React.FC<BeginningSettingProps> = ({ onSave }) => {
  const [aiName, setAiName] = useState("");
  const [goal, setGoal] = useState("");

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>AI 이름과 목표를 설정하세요</h2>
        <label>
          AI 이름
          <Input
            type="text"
            placeholder="AI 이름을 입력하세요"
            value={aiName}
            onChange={(e) => setAiName(e.target.value)}
          />
        </label>
        <label>
          목표
          <Input
            type="text"
            placeholder="목표를 입력하세요"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </label>
        <ButtonContainer>
          <Button onClick={() => onSave(aiName, goal)}>저장</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BeginningSetting;

// 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #3c7960;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

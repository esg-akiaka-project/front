// 로그인 이후, ai 이름 및 목표를 설정하지 않았을때 뜨는 화면
// 설정 이후에는 뜨지않음, (모달)

import React, { useState } from "react";
import styled from "styled-components";

interface BeginningSettingProps {
  onSave: (name: string, goal: string) => void;
}

const BeginningSetting: React.FC<BeginningSettingProps> = ({ onSave }) => {
  const [aiName, setAiName] = useState<string>("");
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const isSaveDisabled = aiName.trim() === "" || selectedGoal === null;

  const goals = [
    "IT/소프트웨어 개발",
    "디자인/창작",
    "교육/연구",
    "의료/보건",
    "법률/행정",
    "마케팅/영업",
    "예술/문화",
    "스포츠/체육",
    "건설/기술직",
    "서비스/관광",
    "사업/창업",
    "기타",
  ];

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
        <h3>목표 선택</h3>
        <GoalGrid>
          {goals.map((goal, index) => (
            <GoalButton
              key={index}
              selected={selectedGoal === goal}
              onClick={() => setSelectedGoal(goal)}
            >
              {goal}
            </GoalButton>
          ))}
        </GoalGrid>
        <ButtonContainer>
          <Button
            onClick={() => onSave(aiName, selectedGoal!)}
            disabled={isSaveDisabled}
          >
            저장
          </Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BeginningSetting;

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
  width: 23rem;
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

const Button = styled.button<{ disabled: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: ${({ disabled }) => (disabled ? "#ddd" : "#3c7960")};
  color: ${({ disabled }) => (disabled ? "#999" : "#fff")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.3s;
  &:hover {
    background: ${({ disabled }) => (disabled ? "#ddd" : "#2a5943")};
  }
`;
const GoalButton = styled.button<{ selected: boolean }>`
  padding: 10px;
  border: 1px solid ${({ selected }) => (selected ? "#3c7960" : "#ddd")};
  background: ${({ selected }) => (selected ? "#3c7960" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#333")};
  border-radius: 4px;
  cursor: pointer;
  border-radius: 1rem;
  transition: background 0.3s;
  &:hover {
    background: ${({ selected }) => (selected ? "#3c7960" : "#f0f0f0")};
  }
`;
const GoalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

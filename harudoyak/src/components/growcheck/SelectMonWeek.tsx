import React from "react";
import styled from "styled-components";

interface SelectMonWeekProps {
  selectedMode: "Month" | "Week";
  onToggleMode: (mode: "Month" | "Week") => void;
}

const SelectMonWeek: React.FC<SelectMonWeekProps> = ({
  selectedMode,
  onToggleMode,
}) => {
  const toggleMode = () => {
    onToggleMode(selectedMode === "Month" ? "Week" : "Month");
  };

  return (
    <ToggleContainer onClick={toggleMode}>
      <ToggleIndicator isWeekly={selectedMode === "Week"} />
      {selectedMode === "Week" && <ModeText>Weekly</ModeText>}
      {selectedMode === "Month" && <ModeText>Monthly</ModeText>}
    </ToggleContainer>
  );
};

export default SelectMonWeek;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 6rem;
  height: 2.7rem;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 30px;
  cursor: pointer;
  position: relative;
  padding: 4px;
  justify-content: center;
`;

const ToggleIndicator = styled.div<{ isWeekly: boolean }>`
  position: absolute;
  top: 4px;
  left: ${({ isWeekly }) => (isWeekly ? "4px" : "60px")}; /* 슬라이딩 위치 */
  width: 2rem;
  height: 2rem;
  background-color: ${({ isWeekly }) => (isWeekly ? "#4CAF50" : "#B0C4B1")};
  border-radius: 30px;
  transition: left 0.3s ease;
`;

const ModeText = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  z-index: 1; /* 텍스트가 슬라이더 위에 표시되도록 설정 */
`;

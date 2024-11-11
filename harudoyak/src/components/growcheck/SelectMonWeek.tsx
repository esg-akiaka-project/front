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
      <ModeText isWeekly={selectedMode === "Week"}>
        {selectedMode === "Week" ? "Weekly" : "Monthly"}
      </ModeText>
    </ToggleContainer>
  );
};

export default SelectMonWeek;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 6rem;
  height: 2.2rem;
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
  left: ${({ isWeekly }) => (isWeekly ? "0.2rem" : "4rem")}; /* 슬라이딩 위치 */
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${({ isWeekly }) => (isWeekly ? "#3C7960" : "#A5CBBC")};
  border-radius: 30px;
  transition: left 0.3s ease;
`;

const ModeText = styled.span<{ isWeekly: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ isWeekly }) =>
    isWeekly ? "2rem" : "0.8rem"}; /* 글씨 위치 조정 */
  font-size: 0.8rem;
  font-weight: bold;
  color: #333;
  transition: left 0.3s ease;
`;

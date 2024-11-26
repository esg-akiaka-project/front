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
      <ToggleIndicator $isWeekly={selectedMode === "Week"} />
      <ModeText $isWeekly={selectedMode === "Week"}>
        {selectedMode === "Week" ? "Weekly" : "Monthly"}
      </ModeText>
    </ToggleContainer>
  );
};

export default SelectMonWeek;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 5.5rem;
  height: 1.6rem;
  background-color: #ffffff;
  border-radius: 30px;
  cursor: pointer;
  position: relative;
  padding: 4px
  justify-content: center;
`;

const ToggleIndicator = styled.div<{ $isWeekly: boolean }>`
  position: absolute;
  left: ${({ $isWeekly }) =>
    $isWeekly ? "0.15rem" : "4.05rem"}; /* 슬라이딩 위치 */
  width: 1.35rem;
  height: 1.35rem;
  background-color: ${({ $isWeekly }) => ($isWeekly ? "#3C7960" : "#A5CBBC")};
  border-radius: 30px;
  transition: left 0.5s ease;
`;

const ModeText = styled.span<{ $isWeekly: boolean }>`
  position: absolute;
  top: 55%;
  transform: translateY(-50%);
  left: ${({ $isWeekly }) =>
    $isWeekly ? "2rem" : "0.65rem"}; /* 글씨 위치 조정 */
  font-size: 0.9rem;
  color: var(--darkgray-from-grayscale);
  transition: left 0.5s ease;
`;

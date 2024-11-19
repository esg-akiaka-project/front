import React from "react";
import styled from "styled-components";
import Root from "../../style/Root";
import AlarmTitleContainer from "./AlarmTitleContainer";
import { AlarmData } from "./AlarmDataTypes";
import AlarmContent from "./AlarmContent";
import AlarmDate from "./AlarmDate";

const CardContainer = styled.div<{ $isClicked: boolean }>`
  width: 353px;
  height: 143px;
  padding: 0px;
  margin-bottom: 30px;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${(props) =>
    props.$isClicked
      ? "rgba(121, 116, 126, 0.08)"
      : "rgba(110, 173, 107, 0.3)"};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Inter", sans-serif;
`;

const AlarmCard: React.FC<{
  alarmCard: AlarmData;
  isClicked: boolean;
  onClick: () => void;
}> = ({ alarmCard, isClicked, onClick }) => {
  return (
    <Root>
      <CardContainer $isClicked={isClicked} onClick={onClick}>
        <AlarmTitleContainer alarmCard={alarmCard} isClicked={isClicked} />
        <AlarmContent content={alarmCard.content} />
        <AlarmDate date={alarmCard.date} />
      </CardContainer>
    </Root>
  );
};

export default AlarmCard;

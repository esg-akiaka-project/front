import React from "react";
import styled from "styled-components";

import Icon from "./AlarmIcon";
import AlarmMessenger from "./AlarmMessenger";
import { AlarmData } from "./AlarmDataTypes";

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 18px;
  font-weight: 900;
  text-shadow: 0.5px 0 0 #333;
  font-family: "Inter", sans-serif;
`;

const TitleWrapper = styled.div`
  padding: 0;
  max-width: 1100px;
  margin-top: 4rem;
`;
const AlarmTitleContainer: React.FC<{
  alarmCard: AlarmData;
  isClicked: boolean;
}> = ({ alarmCard, isClicked }) => {
  console.log(alarmCard.id);
  let buttonLabel1 = "";
  let buttonLabel2 = "";
  let titleText = "";

  switch (alarmCard.id) {
    case "성장기록":
      buttonLabel1 = "주/월간 회고";
      titleText = "성장 기록 도착!";
      break;
    case "AI편지":
      buttonLabel1 = "도약이";
      titleText = "의 편지가 도착했어요!";
      break;
    case "신규댓글":
      buttonLabel1 = alarmCard.title || "";
      buttonLabel2 = alarmCard.nickname || "";
      titleText = "의 신규 댓글";
      break;
    default:
      buttonLabel1 = "알림";
      titleText = "새로운 알림이 있습니다";
  }

  return (
    <TitleWrapper>
      <TitleContainer>
        <Icon isClicked={isClicked} />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <AlarmMessenger label={buttonLabel1} />
          {buttonLabel2 && <AlarmMessenger label={buttonLabel2} />}
          <span>{titleText}</span>
        </div>
      </TitleContainer>
    </TitleWrapper>
  );
};

export default AlarmTitleContainer;

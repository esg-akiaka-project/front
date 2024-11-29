import React from "react";
import styled from "styled-components";

import Icon from "./AlarmIcon";
import AlarmMessenger from "./AlarmMessenger";
import {
  AlarmData,
  CommunityAlarmData,
  isCommunityAlarm,
  isDoyakAlarm,
} from "./AlarmDataTypes";
import { useUserStore } from "@/src/store/useUserStore";

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2px;
  margin-bottom: 0px;
  gap: 7px;
  font-size: 18px;
  font-weight: 900;
  text-shadow: 0.5px 0 0 #333;
  font-family: "Inter", sans-serif;
`;

const TitleWrapper = styled.div`
  padding: 0;
  max-width: 1100px;
  margin-top: 1rem;
  margin-left: 0.5rem;
  margin-bottom: 0rem;
`;
const AlarmTitleContainer: React.FC<{
  alarmCard: AlarmData;
  isClicked: boolean;
}> = ({ alarmCard, isClicked }) => {
  const { aiName } = useUserStore.getState();
  let buttonLabel1 = "";
  let titleText = "";

  if (isDoyakAlarm(alarmCard)) {
    switch (alarmCard.sseEventName) {
      case "WEEK":
      case "MONTH":
        buttonLabel1 = "주/월간 회고";
        titleText = "성장 기록 도착!";
        break;
      case "DAILY":
        buttonLabel1 = aiName;
        titleText = "의 편지가 도착했어요!";
        break;
    }
  } else {
    // 커뮤니티 알람(댓글) 처리
    switch (alarmCard.sseEventName) {
      case "POST_COMMENT":
        buttonLabel1 = alarmCard.data.sender;
        titleText = "님이 회원님의 게시글에 댓글을 달았어요";
        break;
      case "REPLY_COMMENT":
        buttonLabel1 = alarmCard.data.sender;
        titleText = "님이 회원님의 댓글에 답글을 달았어요";
        break;
    }
  }

  return (
    <TitleWrapper>
      <TitleContainer>
        <Icon isClicked={isClicked} />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <AlarmMessenger label={buttonLabel1} />
          <span>{titleText}</span>
        </div>
      </TitleContainer>
    </TitleWrapper>
  );
};

export default AlarmTitleContainer;

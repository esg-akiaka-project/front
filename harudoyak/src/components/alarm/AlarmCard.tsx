import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import AlarmTitleContainer from "./AlarmTitleContainer";
import {
  DoyakAlarmData,
  CommunityAlarmData,
  AlarmData,
  isCommunityAlarm,
  isDoyakAlarm,
} from "./AlarmDataTypes";
import AlarmContent from "./AlarmContent";
import AlarmDate from "./AlarmDate";
import { addDays } from "date-fns";

const CardContainer = styled.div<{ $isClicked: boolean }>`
  width: 100% /* ExternalContainer에 맞추기 */
  max-width: 353px; /* 너무 커지지 않도록 제한 */
  height: 143px;
  padding: 0px;
  margin: 40px 0px;
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
  const router = useRouter();

  const getContent = (alarm: AlarmData): string => {
    if (isDoyakAlarm(alarm)) {
      return alarm.data.content || "";
    } else {
      return alarm.data.content || "";
    }
  };
  const handleClick = () => {
    onClick();
    console.log(alarmCard.sseEventName);
    if (isCommunityAlarm(alarmCard)) {
      const postId = alarmCard.data.shareDoyakId;
      router.push({
        pathname: "/community",
        query: { postId: postId },
      });
    } else if (isDoyakAlarm(alarmCard)) {
      switch (alarmCard.sseEventName) {
        case "DAILY":
          router.push({
            pathname: "/grow-check",
            query: {
              mode: "Week", // 주간 모드 설정
              dayToSelect: String(addDays(alarmCard.creationDate, -1)), // 특정 일자 선택
            },
          });
          break;
        case "WEEK":
          router.push({
            pathname: "/grow-check",
            query: {
              mode: "Week",
              week: String(addDays(alarmCard.creationDate, -1)),
            },
          });
          break;

        case "MONTH":
          router.push({
            pathname: "/grow-check",
            query: {
              mode: "Month",
              month: String(addDays(alarmCard.creationDate, -1)),
            },
          });
          break;
      }
    }
  };
  return (
    <CardContainer $isClicked={isClicked} onClick={handleClick}>
      <AlarmTitleContainer alarmCard={alarmCard} isClicked={isClicked} />
      <AlarmContent content={getContent(alarmCard)} />
      <AlarmDate date={alarmCard.creationDate} />
    </CardContainer>
  );
};

export default AlarmCard;

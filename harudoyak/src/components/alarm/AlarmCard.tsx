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
      return alarm.data.content || ""; // DAILY 알람의 경우
    } else {
      // 커뮤니티 알람의 경우
      return alarm.data.content || ""; // 댓글 내용
    }
  };
  const handleClick = () => {
    onClick(); // 기존의 클릭 핸들러 유지 (카드 색상 변경 등)

    if (isCommunityAlarm(alarmCard)) {
      const postId = alarmCard.data.shareDoyakId;
      router.push({
        pathname: "/community",
        query: { postId: postId },
      });
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

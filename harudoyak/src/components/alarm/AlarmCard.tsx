import React from "react";
import { AlarmData } from "./types";
import IconComponent from "./IconComponent";
import { AlarmCardContainer, Title, Content, DateDisplay } from "./AlarmCardStyles";

interface AlarmCardProps {
  alarmCard: AlarmData;
  isClicked: boolean;
  onClick: () => void;
}

const AlarmCard: React.FC<AlarmCardProps> = ({ alarmCard, isClicked, onClick }) => {
  const truncatedContent = (content: string) => {
    const MAX_CONTENT_LENGTH = 60;
    return content.length > MAX_CONTENT_LENGTH
      ? content.substring(0, MAX_CONTENT_LENGTH) + "..."
      : content;
  };

  return (
    <AlarmCardContainer onClick={onClick} isClicked={isClicked}>
      <Title>
        <IconComponent isClicked={isClicked} />
        <div>{alarmCard.id}</div>
        <span>새로운 알림이 있습니다</span>
      </Title>
      <Content>{truncatedContent(alarmCard.content)}</Content>
      <DateDisplay>{new Date(alarmCard.date).toLocaleDateString("ko-KR")}</DateDisplay>
    </AlarmCardContainer>
  );
};

export default AlarmCard;
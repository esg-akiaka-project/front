import React from 'react';
import styled from 'styled-components';
import AlarmCard from './AlarmCard';
import { AlarmData } from './AlarmDataTypes';

const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

const AlarmListContainer: React.FC<{
  activeTab: string;
  generalAlarmData: AlarmData[];
  communityAlarmData: AlarmData[];
  clickedGeneralAlarmCard: boolean[];
  clickedCommunityAlarmCard: boolean[];
  handleCardClick: (index: number) => void;
}> = ({
  activeTab,
  generalAlarmData,
  communityAlarmData,
  clickedGeneralAlarmCard,
  clickedCommunityAlarmCard,
  handleCardClick
}) => {
  const alarmData = activeTab === "Record" ? generalAlarmData : communityAlarmData;
  const clickedData = activeTab === "Record" ? clickedGeneralAlarmCard : clickedCommunityAlarmCard;

  return (
    <ListContainer>
      {alarmData.map((alarmCard, index) => (
        <AlarmCard
          key={alarmCard.id}
          alarmCard={alarmCard}
          isClicked={clickedData[index]}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </ListContainer>
  );
};

export default AlarmListContainer;
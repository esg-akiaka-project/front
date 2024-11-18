import React, { useState, useEffect } from 'react';
import { AlarmData } from './AlarmDataTypes';  
import AlarmTitleContainer from './AlarmTitleContainer'; 

const AlarmImportData: React.FC<{
  activeTab: string;
  handleCardClick: (index: number) => void;
  clickedGeneralAlarmCard: boolean[];
  clickedCommunityAlarmCard: boolean[];
  handleDataFetch: (GeneralData: AlarmData[], CommunityData: AlarmData[]) => void;
}> = ({
  activeTab,
  handleCardClick,
  clickedGeneralAlarmCard,
  clickedCommunityAlarmCard,
  handleDataFetch
}) => {
  const [GeneralAlarmData, setGeneralAlarmData] = useState<AlarmData[]>([
    {
      id: "성장기록",
      content:
        "이번 달은 긍정적인 기운이 많았던 것 같아! 성취감을 느낀 날들이 지난 달보다 10일 정도 많았어!",
      date: "2024-10-17",
    },
    {
      id: "AI편지",
      content:
        "친애하는 친구에게, 당신의 성장 가능성을 믿습니다. 항상 새로운 도전과 배움을 통해 더 나은 자신을 만들어가길 응원합니다. 힘든 순간에도 포기하지 말고, 당신의 꿈을 향해 한 걸음씩 나아가세요.",
      date: "2024-10-23",
    },
  ]);

  const [CommunityAlarmData, setCommunityAlarmData] = useState<AlarmData[]>([
    {
      id: "신규댓글",
      title: "게시글 Title",
      nickname: "타 유저 닉네임",
      content: "댓글 요약",
      date: "2024-10-25",
    },
  ]);

  useEffect(() => {
    // activeTab에 따라 알람 데이터를 부모 컴포넌트로 전달
    handleDataFetch(GeneralAlarmData, CommunityAlarmData);
  }, [activeTab, GeneralAlarmData, CommunityAlarmData, handleDataFetch]);

  return (
    <div>
      {activeTab === "Record"
        ? GeneralAlarmData.map((alarm, index) => (
            <div key={alarm.id} onClick={() => handleCardClick(index)}>
              <AlarmTitleContainer alarmCard={alarm} isClicked={clickedGeneralAlarmCard[index]} />
            </div>
          ))
        : CommunityAlarmData.map((alarm, index) => (
            <div key={alarm.id} onClick={() => handleCardClick(index)}>
              <AlarmTitleContainer alarmCard={alarm} isClicked={clickedCommunityAlarmCard[index]} />
            </div>
          ))}
    </div>
  );
};

export default AlarmImportData;
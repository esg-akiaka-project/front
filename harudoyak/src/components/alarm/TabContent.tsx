import React from "react";
import AlarmCard from "./AlarmCard";
import { AlarmData } from "./types";

interface TabContentProps {
  activeTab: string;
  GeneralAlarmData: AlarmData[];
  CommunityAlarmData: AlarmData[];
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, GeneralAlarmData, CommunityAlarmData }) => {
  return (
    <div style={{ flex: "1", overflowY: "auto" }}>
      {activeTab === "Record" &&
        GeneralAlarmData.map((alarmCard, index) => (
          <AlarmCard
            key={alarmCard.id}
            alarmCard={alarmCard}
            isClicked={false} // 상태 관리 추가
            onClick={() => console.log("clicked")}
          />
        ))}
      {activeTab === "Community" &&
        CommunityAlarmData.map((alarmCard, index) => (
          <AlarmCard
            key={alarmCard.id}
            alarmCard={alarmCard}
            isClicked={false} // 상태 관리 추가
            onClick={() => console.log("clicked")}
          />
        ))}
    </div>
  );
};

export default TabContent;
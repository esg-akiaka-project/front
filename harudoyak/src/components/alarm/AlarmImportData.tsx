import React, { useState, useEffect } from "react";
import {
  AlarmData,
  CommunityAlarmData,
  DoyakAlarmData,
} from "./AlarmDataTypes";
import AlarmCard from "./AlarmCard";
import { HarudoyakAlarmList, seorodoyakAlarmList } from "@/src/apis/logsApi";
interface AlarmImportDataProps {
  activeTab: string;
  handleCardClick: (index: number) => void;
  clickedGeneralAlarmCard: boolean[];
  clickedCommunityAlarmCard: boolean[];
  handleDataFetch: (
    GeneralData: DoyakAlarmData[],
    CommunityData: CommunityAlarmData[]
  ) => void;
}

const AlarmImportData: React.FC<AlarmImportDataProps> = ({
  activeTab,
  handleCardClick,
  clickedGeneralAlarmCard,
  clickedCommunityAlarmCard,
  handleDataFetch,
}) => {
  const [GeneralAlarmData, setGeneralAlarmData] = useState<AlarmData[]>([]);

  const [CommunityAlarmData, setCommunityAlarmData] = useState<AlarmData[]>([]);

  useEffect(() => {
    const doyakRecord = async () => {
      try {
        const response = await HarudoyakAlarmList();
        console.log(response);
        setGeneralAlarmData(response);
      } catch (error) {
        console.log(error);
      }
    };
    const seoroRecord = async () => {
      try {
        const response = await seorodoyakAlarmList();
        console.log(response);
        setCommunityAlarmData(response);
      } catch (error) {
        console.log(error);
      }
    };
    doyakRecord();
    seoroRecord();
  }, []);

  return (
    <div>
      {activeTab === "Record"
        ? GeneralAlarmData.map((alarm, index) => (
            <div
              key={alarm.notificationId}
              onClick={() => handleCardClick(index)}
            >
              <AlarmCard
                alarmCard={alarm}
                isClicked={clickedGeneralAlarmCard[index]}
                onClick={() => handleCardClick(index)}
              />
            </div>
          ))
        : CommunityAlarmData.map((alarm, index) => (
            <div
              key={alarm.notificationId}
              onClick={() => handleCardClick(index)}
            >
              <AlarmCard
                alarmCard={alarm}
                isClicked={clickedCommunityAlarmCard[index]}
                onClick={() => handleCardClick(index)}
              />
            </div>
          ))}
    </div>
  );
};

export default AlarmImportData;

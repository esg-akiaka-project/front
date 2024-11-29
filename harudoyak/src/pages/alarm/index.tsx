"use client";
import React, { useState } from "react";
import Root from "../../style/Root";
import { useRouter } from "next/router";
import ExternalContainerSet from "../../components/alarm/ExternalContainerSet";
import TapButtonContainer from "../../components/alarm/TabButtonContainer";
import AlarmListContainer from "../../components/alarm/AlarmListContainer";
import AlarmImportData from "../../components/alarm/AlarmImportData";
import {
  DoyakAlarmData,
  CommunityAlarmData,
} from "../../components/alarm/AlarmDataTypes";

const AlarmHome: React.FC = () => {
  const router = useRouter();
  const [ActiveTab, setActiveTab] = useState<string>("Record");

  const [GeneralAlarmData, setGeneralAlarmData] = useState<DoyakAlarmData[]>(
    []
  );
  const [CommunityAlarmData, setCommunityAlarmData] = useState<
    CommunityAlarmData[]
  >([]);

  const [ClickedGeneralAlarmCard, setClickedGeneralAlarmCard] = useState<
    boolean[]
  >([]);
  const [ClickedCommunityAlarmCard, setClickedCommunityAlarmCard] = useState<
    boolean[]
  >([]);

  // useEffect(() => {
  //   router.push({
  //     pathname: "/grow-check", // 이동할 경로
  //     query: { key1: "value1", key2: "value2" },
  //   });
  // }, [router]); // router를 의존성 배열에 추가

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // AlarmImportData 컴포넌트에서 알람 데이터를 받아오는 함수
  const handleDataFetch = (
    GeneralData: DoyakAlarmData[],
    CommunityData: CommunityAlarmData[]
  ) => {
    setGeneralAlarmData(GeneralData);
    setCommunityAlarmData(CommunityData);
    setClickedGeneralAlarmCard(new Array(GeneralData.length).fill(false));
    setClickedCommunityAlarmCard(new Array(CommunityData.length).fill(false));
  };

  const handleCardClick = (index: number) => {
    if (ActiveTab === "Record") {
      const updatedClickedGeneralAlarmCard = [...ClickedGeneralAlarmCard];
      updatedClickedGeneralAlarmCard[index] =
        !updatedClickedGeneralAlarmCard[index];
      setClickedGeneralAlarmCard(updatedClickedGeneralAlarmCard);
    } else {
      const updatedClickedCommunityAlarmCard = [...ClickedCommunityAlarmCard];
      updatedClickedCommunityAlarmCard[index] =
        !updatedClickedCommunityAlarmCard[index];
      setClickedCommunityAlarmCard(updatedClickedCommunityAlarmCard);
    }
  };

  return (
    <Root>
      <ExternalContainerSet>
        <TapButtonContainer
          activeTab={ActiveTab}
          handleTabClick={handleTabClick}
        />
        <AlarmImportData
          activeTab={ActiveTab}
          handleDataFetch={handleDataFetch}
          handleCardClick={handleCardClick}
          clickedGeneralAlarmCard={ClickedGeneralAlarmCard}
          clickedCommunityAlarmCard={ClickedCommunityAlarmCard}
        />
        <AlarmListContainer
          activeTab={ActiveTab}
          generalAlarmData={GeneralAlarmData}
          communityAlarmData={CommunityAlarmData}
          clickedGeneralAlarmCard={ClickedGeneralAlarmCard}
          clickedCommunityAlarmCard={ClickedCommunityAlarmCard}
          handleCardClick={handleCardClick}
        />
      </ExternalContainerSet>
    </Root>
  );
};

export default AlarmHome;

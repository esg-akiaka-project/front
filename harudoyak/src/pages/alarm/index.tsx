import React, { useState, useEffect } from "react";
import Image from "next/image";
import Root from "../../style/Root";
import { useRouter } from "next/router";
import ExternalContainerSet from "../../components/alarm/ExternalContainerSet";
import TapButtonContainer from "../../components/alarm/TabButtonContainer";
import AlarmListContainer from "../../components/alarm/AlarmListContainer";
import { AlarmData } from "../../components/alarm/AlarmDataTypes";
import AlarmImportData from "../../components/alarm/AlarmImportData";
import AlarmCard from "../../components/alarm/AlarmCard";

const AlarmHome: React.FC = () => {
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<string>("Record");
  const [isClicked, setIsClicked] = useState(false); // isClicked 상태 추가
  
  useEffect(() => {
    router.push({
      pathname: '/grow-check',  // 이동할 경로
      query: { key1: 'value1', key2: 'value2' }
    });
  }, []);


  // todo: 알람 데이터 api 연동
  const [generalAlarmData, setGeneralAlarmData] = useState<AlarmData[]>([
    {
      id: "성장기록",
      content:
        "이번 달은 긍정적인 기운이 많았던 것 같아! 성취감을 느낀 날들이 지난 달보다 10일 정도 많았어!",
      date: "2024-10-17",
    },
    {
      id: "AI편지",
      content:
        "친애하는 친구에게, 당신의 성장 가능성을 믿습니다. 항상 새로운 도전과 배움을 통해 더 나은 자신을 만들어가길 응원합니다.힘든 순간에도 포기하지 말고, 당신의 꿈을 향해 한 걸음씩 나아가세요.",
      date: "2024-10-23",
    },
  ]);
  const [communityAlarmData, setCommunityAlarmData] = useState<AlarmData[]>([
    {
      id: "신규댓글",
      title: "게시글 Title",
      nickname: "타 유저 닉네임",
      content: "댓글 요약",
      date: "2024-10-23",
    },
  ]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const [clickedGeneralAlarmCard, setClickedGeneralAlarmCard] = useState<
    boolean[]
  >(new Array(generalAlarmData.length).fill(false));

  const [clickedCommunityAlarmCard, setClickedCommunityAlarmCard] = useState<
    boolean[]
  >(new Array(communityAlarmData.length).fill(false));

  const handleCardClick = (index: number) => {
    if (ActiveTab === "Record") {
      const updatedClickedGeneralAlarmCard = [...ClickedGeneralAlarmCard];
      updatedClickedGeneralAlarmCard[index] = !updatedClickedGeneralAlarmCard[index];
      setClickedGeneralAlarmCard(updatedClickedGeneralAlarmCard);
    } else {
      const updatedClickedCommunityAlarmCard = [...ClickedCommunityAlarmCard];
      updatedClickedCommunityAlarmCard[index] = !updatedClickedCommunityAlarmCard[index];
      setClickedCommunityAlarmCard(updatedClickedCommunityAlarmCard);
    }
    setIsClicked(!isClicked); // isClicked 상태 토글
  };

  const renderTitle = (alarmCard: AlarmData, isClicked: boolean) => {
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
    <Root>
      <ExternalContainerSet>
        <TapButtonContainer activeTab={ActiveTab} handleTabClick={handleTabClick} />
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

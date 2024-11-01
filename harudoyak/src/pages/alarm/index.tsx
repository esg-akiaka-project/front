import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import Root from "../../style/Root";

interface AlarmData {
  id: string;
  title?: string; // 게시글의 제목
  nickname?: string; // 유저 닉네임
  content: string;
  date: string;
}

const AlarmHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Record");
  const [isClicked, setIsClicked] = useState(false); // isClicked 상태 추가

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const GeneralAlarmData: AlarmData[] = [
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
  ];

  const CommunityAlarmData: AlarmData[] = [
    {
      id: "신규댓글",
      title: "게시글 Title",
      nickname: "타 유저 닉네임",
      content: "댓글 요약",
      date: "2024-10-23",
    },
  ];

  const [clickedGeneralAlarmCard, setClickedGeneralAlarmCard] = useState<
    boolean[]
  >(new Array(GeneralAlarmData.length).fill(false));
  const [clickedCommunityAlarmCard, setClickedCommunityAlarmCard] = useState<
    boolean[]
  >(new Array(CommunityAlarmData.length).fill(false));

  const handleCardClick = (index: number) => {
    if (activeTab === "Record") {
      const updatedClickedGeneralAlarmCard = [...clickedGeneralAlarmCard];
      updatedClickedGeneralAlarmCard[index] = true;
      setClickedGeneralAlarmCard(updatedClickedGeneralAlarmCard);
    } else {
      const updatedClickedCommunityAlarmCard = [...clickedCommunityAlarmCard];
      updatedClickedCommunityAlarmCard[index] = true;
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
        <div style={styles.Title}>
          <IconComponent isClicked={isClicked} /> {/* isClicked 값 전달 */}
          <div style={styles.Messenger}>{buttonLabel1}</div>{" "}
          {/* 첫 번째 버튼 */}
          {buttonLabel2 && (
            <div style={styles.Messenger}>{buttonLabel2}</div>
          )}{" "}
          {/* 두 번째 버튼 (신규댓글 경우에만) */}
          <span>{titleText}</span> {/* 제목 텍스트 */}
        </div>
      </Root>
    );
  };

  const styles = {
    container: {
      maxWidth: "390px",
      height: "844px",
      margin: "0 auto",
      padding: "15px",
      backgroundColor: "#F2F6F3",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      fontFamily: "Inter, sans-serif",
      letterSpacing: "-1px",
    } as React.CSSProperties,
    ButtonContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "30px",
      marginTop: "120px",
      fontFamily: "Inter, sans-serif",
    } as React.CSSProperties,
    TabButton: (isActive: boolean): React.CSSProperties => ({
      flex: "1",
      width: "174px",
      height: "59px",
      padding: "5px 3px",
      backgroundColor: isActive ? "#3C7960" : "#A5CBBC",
      color: "#ffffff",
      border: "none",
      borderRadius: "20px",
      marginRight: "10px",
      fontWeight: 900,
      fontSize: "18px",
      fontFamily: "Inter, sans-serif",
    }),
    AlarmCard: (isClicked: boolean): React.CSSProperties => ({
      width: "353px",
      height: "143px",
      padding: "15px",
      marginBottom: "30px",
      borderRadius: "10px",
      cursor: "pointer",
      backgroundColor: isClicked
        ? "rgba(121, 116, 126, 0.08)"
        : "rgba(110, 173, 107, 0.3)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      overflow: "hidden",
      position: "relative",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      fontFamily: "Inter, sans-serif",
    }),
    Title: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "18px",
      fontWeight: 900,
      textShadow: "0.5px 0 0 #333",
      fontFamily: "Inter, sans-serif",
    } as React.CSSProperties,
    Icon: (isClicked: boolean): React.CSSProperties => ({
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      display: "inline-block",
      opacity: isClicked ? 0.3 : 0.8, // Alarm Card의 투명도 따라감
    }),
    Messenger: {
      width: "90px",
      height: "33px",
      padding: "5px 10px",
      backgroundColor: "#ffffff",
      color: "#3C7960",
      borderRadius: "15px",
      fontSize: "12px",
      fontWeight: "Regular",
      textShadow: "none",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "85px",
      display: "inline-block",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      fontFamily: "Inter, sans-serif",
      textAlign: "center",
    } as React.CSSProperties,
    Content: {
      fontSize: "15px",
      lineHeight: "1.4",
      fontWeight: 700,
      margin: "10px 0",
      color: "#333",
      width: "100%",
      height: "100%",
      display: "-webkit-box",
      whiteSpace: "normal",
      overflowWrap: "break-word",
      wordBreak: "break-word",
      alignItems: "center",
    } as React.CSSProperties,
    Date: {
      fontSize: "12px",
      color: "#666",
      position: "absolute",
      fontWeight: "Regular",
      bottom: "10px",
      right: "10px",
      fontFamily: "Inter, sans-serif",
    } as React.CSSProperties,
    Footer: {
      padding: "15px",
      textAlign: "center",
      backgroundColor: "#ffffff",
      borderRadius: "5px",
      marginTop: "30px",
      fontFamily: "Inter, sans-serif",
    } as React.CSSProperties,
    AlarmList: {
      flex: "1",
      overflowY: "auto",
      overflowX: "hidden",
    } as React.CSSProperties,
  };

  const MAX_CONTENT_LENGTH = 60; // 최대 글자 수

  const truncatedContent = (content: string) => {
    return content.length > MAX_CONTENT_LENGTH
      ? content.substring(0, MAX_CONTENT_LENGTH) + "..."
      : content;
  };

  const IconComponent = ({ isClicked }: { isClicked: boolean }) => (
    <div style={styles.Icon(isClicked)}>
      <FaEnvelope size={20} color="#3C7960" style={{ position: "absolute" }} />
      <FaEnvelope size={20} color="#3C7960" style={{ position: "absolute" }} />
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.ButtonContainer}>
        <button
          style={styles.TabButton(activeTab === "Record")}
          onClick={() => handleTabClick("Record")}
        >
          도약 기록
        </button>
        <button
          style={styles.TabButton(activeTab === "Community")}
          onClick={() => handleTabClick("Community")}
        >
          서로 도약
        </button>
      </div>
      <div style={styles.AlarmList}>
        {activeTab === "Record"
          ? GeneralAlarmData.map((alarmCard, index) => (
              <div
                key={alarmCard.id}
                onClick={() => handleCardClick(index)}
                style={styles.AlarmCard(clickedGeneralAlarmCard[index])}
              >
                {renderTitle(alarmCard, clickedGeneralAlarmCard[index])}
                <div style={styles.Content}>
                  {truncatedContent(alarmCard.content)}
                </div>
                <div style={styles.Date}>
                  {`${new Date(alarmCard.date).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })} 
                  ${new Date(alarmCard.date).toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()}`}
                </div>
              </div>
            ))
          : CommunityAlarmData.map((alarmCard, index) => (
              <div
                key={alarmCard.id}
                onClick={() => handleCardClick(index)}
                style={styles.AlarmCard(clickedCommunityAlarmCard[index])}
              >
                {renderTitle(alarmCard, clickedCommunityAlarmCard[index])}
                <div style={styles.Content}>
                  {truncatedContent(alarmCard.content)}
                </div>
                <div style={styles.Date}>
                  {`${new Date(alarmCard.date).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })} 
                  ${new Date(alarmCard.date).toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()}`}
                </div>
              </div>
            ))}
      </div>
      <div style={styles.Footer}>Footer 공통 내용</div>
    </div>
  );
};

export default AlarmHome;

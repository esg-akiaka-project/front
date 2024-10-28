import React, { useState } from "react";

interface AlarmData {
  id: string;
  type: string;
  content: string;
  date: string;
}

const AlarmHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Record");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const GeneralAlarmData: AlarmData[] = [
    {
      id: "성장기록",
      type: "성장기록 알람",
      content: "결과 요약",
      date: "2024-10-23",
    },
    {
      id: "AI편지",
      type: "편지 도착 알림",
      content: "도약이의 편지가 도착했습니다.",
      date: "2024-10-23",
    },
  ];

  const CommunityAlarmData: AlarmData[] = [
    {
      id: "신규댓글",
      type: "신규댓글 알람",
      content: "댓글 요약",
      date: "2024-10-23",
    },
  ];

  const [clickedGeneralAlarmCard, setClickedGeneralAlarmCard] = useState<boolean[]>(new Array(GeneralAlarmData.length).fill(false));
  const [clickedCommunityAlarmCard, setClickedCommunityAlarmCard] = useState<boolean[]>(new Array(CommunityAlarmData.length).fill(false));

  const handleCardClick = (index: number) => {
    if (activeTab === "Record") {
      const updatedClickedGeneralAlarmCard = [...clickedGeneralAlarmCard];
      updatedClickedGeneralAlarmCard[index] = true; // 항상 true로 설정
      setClickedGeneralAlarmCard(updatedClickedGeneralAlarmCard);
    } else {
      const updatedClickedCommunityAlarmCard = [...clickedCommunityAlarmCard];
      updatedClickedCommunityAlarmCard[index] = true; // 항상 true로 설정
      setClickedCommunityAlarmCard(updatedClickedCommunityAlarmCard);
    }
  };

  const styles = {
    container: {
      maxWidth: "390px",
      height: "844px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#F2F6F3",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      fontFamily: 'Inter, sans-serif' 
    },
    ButtonContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "30px",
      marginTop: "120px",
    },
    Button: (isActive: boolean) => ({
      flex: "1",
      maxWidth: "174px",
      height: "59px",
      padding: "20px",
      backgroundColor: isActive ? "#3C7960" : "#A5CBBC",
      color: "#ffffff",
      border: "none",
      borderRadius: "20px",
      marginRight: "10px",
      fontWeight: "bold",
      fontSize: "18px", 
    }),
    AlarmCard: (isClicked: boolean) => ({
      maxWidth: "353px",
      height: "143px",
      padding: "15px",
      marginBottom: "30px",
      borderRadius: "10px",
      cursor: "pointer",
      backgroundColor: isClicked ? "rgba(121, 116, 126, 0.08)" : "rgba(110, 173, 107, 0.3)",
      position: "relative" as const,
    }),
    CardTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      fontFamily: 'Inter, sans-serif', 
    },
    CardContent: {
      fontSize: "15px",
      margin: "5px 0",
      fontFamily: 'Inter, sans-serif', 
    },
    CardDate: {
      fontSize: "12px",
      color: "#666",
      position: "absolute",
      bottom: "10px",
      right: "10px",
      fontFamily: 'Inter, sans-serif', 
    },
    Footer: {
      padding: "15px",
      textAlign: "center",
      backgroundColor: "#ffffff",
      borderRadius: "5px",
      marginTop: "30px",
      fontFamily: 'Inter, sans-serif', 
    },
    AlarmList: {
      flex: "1",
      overflowY: "auto",
      fontFamily: 'Inter, sans-serif', 
    },
} as const; 
  
  
  return (
    <div style={styles.container}>
      <div style={styles.ButtonContainer}>
        <button
          style={styles.Button(activeTab === "Record")}
          onClick={() => handleTabClick("Record")}
        >도약기록</button>
        <button
          style={styles.Button(activeTab === "Community")}
          onClick={() => handleTabClick("Community")}
        >서로도약</button>
      </div>
      <div style={styles.AlarmList}>
        {activeTab === "Record"
          ? GeneralAlarmData.map((alarmCard, index) => (
              <div
                key={alarmCard.id}
                onClick={() => handleCardClick(index)}
                style={styles.AlarmCard(clickedGeneralAlarmCard[index])}
              >
                <div style={styles.CardTitle}>{alarmCard.type}</div>
                <div style={styles.CardContent}>{alarmCard.content}</div>
                <div style={styles.CardDate}>{alarmCard.date} ({new Date(alarmCard.date).toLocaleDateString("ko-KR", { weekday: 'long' })})</div>
              </div>
            ))
          : CommunityAlarmData.map((alarmCard, index) => (
              <div
                key={alarmCard.id}
                onClick={() => handleCardClick(index)}
                style={styles.AlarmCard(clickedCommunityAlarmCard[index])}
              >
                <div style={styles.CardTitle}>{alarmCard.type}</div>
                <div style={styles.CardContent}>{alarmCard.content}</div>
                <div style={styles.CardDate}>{alarmCard.date} ({new Date(alarmCard.date).toLocaleDateString("ko-KR", { weekday: 'long' })})</div>
              </div>
            ))}
      </div>
      <div style={styles.Footer}>
        Footer 내용
      </div>
    </div>
  );
};

export default AlarmHome;

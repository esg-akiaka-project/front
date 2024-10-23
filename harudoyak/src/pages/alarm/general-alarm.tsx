import React, { useState } from "react";

const GeneralAlarm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Record");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const GeneralAlarmData = [
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

  const [clickedAlarmCard, setClickedAlarmCard] = useState(
    new Array(GeneralAlarmData.length).fill(false)
  );

  const handleCardClick = (index: number) => {
    const updatedClickedAlarmCard = [...clickedAlarmCard];
    updatedClickedAlarmCard[index] = true;
    setClickedAlarmCard(updatedClickedAlarmCard);
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "20px auto",
      padding: "20px",
      backgroundColor: "#F2F6F3",
    },
    ButtonContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    Button: (isActive: boolean) => ({
      flex: "1",
      padding: "10px",
      backgroundColor: isActive ? "#3C7960" : "#A5CBBC",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
    }),
    AlarmCard: (isClicked: boolean) => ({
      padding: "15px",
      marginBottom: "10px",
      borderRadius: "5px",
      cursor: "pointer",
      backgroundColor: isClicked ? "rgba(121, 116, 126, 0.08)" : "rgba(110, 173, 107, 0.3)",
    }),
    CardTitle: {
      fontWeight: "bold",
    },
    CardContent: {
      margin: "5px 0",
    },
    CardDate: {
      fontSize: "12px",
      color: "#666",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.ButtonContainer}>
        <button
          style={styles.Button(activeTab === "Record")}
          onClick={() => handleTabClick("Record")}
        >
          도약기록
        </button>
        <button
          style={styles.Button(activeTab === "Community")}
          onClick={() => handleTabClick("Community")}
        >
          서로도약
        </button> 
      </div>
      <div>
        {activeTab === "Record" && (
          GeneralAlarmData.map((alarmCard, index) => (
            <div
              key={alarmCard.id}
              onClick={() => handleCardClick(index)}
              style={styles.AlarmCard(clickedAlarmCard[index])}
            >
              <div style={styles.CardTitle}>{alarmCard.type}</div>
              <div style={styles.CardContent}>{alarmCard.content}</div>
              <div style={styles.CardDate}>{alarmCard.date}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GeneralAlarm;
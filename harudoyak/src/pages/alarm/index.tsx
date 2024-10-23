import React, {useState} from "react";
import GeneralAlarm from "./general-alarm";
import CommunityAlarm from "./community-alarm";

const AlarmHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Record");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
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
        {activeTab === "Record" ? (
          <GeneralAlarm />
        ) : (
          <CommunityAlarm/>
        )}
      </div>
    </div>
  );
};


export default AlarmHome;
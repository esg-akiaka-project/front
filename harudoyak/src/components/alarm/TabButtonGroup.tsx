import React from "react";
import TabButton from "./TabButton";

interface TabButtonGroupProps {
  activeTab: string;
  handleTabClick: (tab: string) => void;
}

const TabButtonGroup: React.FC<TabButtonGroupProps> = ({ activeTab, handleTabClick }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <TabButton isActive={activeTab === "Record"} onClick={() => handleTabClick("Record")} label="도약 기록" />
      <TabButton isActive={activeTab === "Community"} onClick={() => handleTabClick("Community")} label="서로 도약" />
    </div>
  );
};

export default TabButtonGroup;
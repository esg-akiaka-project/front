import React from "react";
import styled from "styled-components";
import TapButton from "./TapbuttonSet"; // TapButtonSet 임포트

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 50px;
`;

const TapButtonContainer: React.FC<{
  activeTab: string;
  handleTabClick: (tab: string) => void;
}> = ({ activeTab, handleTabClick }) => {
  return (
    <ButtonContainer>
      {/* TapButton 컴포넌트에 label prop 전달 */}
      <TapButton
        $isActive={activeTab === "Record"}
        label="도약 기록" // label prop 추가
        onClick={() => handleTabClick("Record")}
      />
      <TapButton
        $isActive={activeTab === "Community"}
        label="서로 도약" // label prop 추가
        onClick={() => handleTabClick("Community")}
      />
    </ButtonContainer>
  );
};

export default TapButtonContainer;

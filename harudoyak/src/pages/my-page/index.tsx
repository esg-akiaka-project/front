import React from "react";
import Root from "../../style/Root";
import UndoAndPageName from "@/src/components/mypage/UndoAndPageName";
import UserInfoSection from "@/src/components/mypage/UserInfoSection";
import styled from "styled-components";
import UserOptionSection from "@/src/components/mypage/UserOptionSection";
import NavigationBar from "@/src/components/common/navigationbar/NavigationBar";

const MyPageHome: React.FC = () => {
  return (
    <Root>
      <Container>
        <UndoAndPageName pageName={"마이페이지"} />
        <UserInfoSection />
      </Container>
      <UserOptionSection />
      <NavigationBar />
    </Root>
  );
};

export default MyPageHome;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem; /* UndoAndPageName과 UserInfoSection 간 간격 */
  // padding-top: 1rem; /* 상단 여백 */
`;

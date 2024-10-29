import React from "react";
import MonthlyCalendar from "../components/home/MonthlyCalendar";
import styled from "styled-components";
import Root from "./../style/Root";

const Home: React.FC = () => {
  return (
    <Root>
      <Heading1>하루도약을 시작하기 위해<br></br>마이페이지를 클릭해주세요</Heading1>
      <MonthlyCalendar></MonthlyCalendar>
    </Root>
  );
};

const Heading1 = styled.h1`
  font-size: 1.44rem;
  color: var(--main-green);
`;

export default Home;

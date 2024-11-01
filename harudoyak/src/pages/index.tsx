import React from "react";
import MonthlyCalendar from "../components/home/MonthlyCalendar";
import styled from "styled-components";
import Root from "./../style/Root";
import LoginButton from '../components/home/HomeLoginButton';

const Home: React.FC = () => {
  return (
    <Root>
      <Heading2>하루도약 시작하기</Heading2>
      <StyledLogin />
      <MonthlyCalendar></MonthlyCalendar>
    </Root>
  );
};

const Heading2 = styled.h2`
  font-size: 1.44rem;
  color: var(--main-green);
  padding: 3% 5%;
  text-align: center;
`;

const StyledLogin = styled(LoginButton)`
  display: flex;
  position: absolute;
  left: 50%;
`;

export default Home;

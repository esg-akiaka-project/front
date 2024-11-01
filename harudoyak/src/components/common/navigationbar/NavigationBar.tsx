import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import Alarm from "@/public/assets/common/Alarm.svg";
import Community from "@/public/assets/common/Community.svg";
import Home from "@/public/assets/common/Home.svg";
import Mypage from "@/public/assets/common/Mypage.svg";
import Record from "@/public/assets/common/Record.svg";

const NavigationBar: React.FC = () => {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <NavContainer>
      <NavButton onClick={() => navigate("/")}>
        <Image src={Home} alt="Home" width={24} height={24} />
        <ButtonText>홈</ButtonText>
      </NavButton>
      <NavButton onClick={() => navigate("/grow-up-record")}>
        <Image src={Record} alt="Record" width={24} height={24} />
        <ButtonText>도약기록</ButtonText>
      </NavButton>
      <NavButton onClick={() => navigate("/community")}>
        <Image src={Community} alt="Community" width={24} height={24} />
        <ButtonText>서로도약</ButtonText>
      </NavButton>
      <NavButton onClick={() => navigate("/alarm")}>
        <Image src={Alarm} alt="Notifications" width={24} height={24} />
        <ButtonText>알림</ButtonText>
      </NavButton>
      <NavButton onClick={() => navigate("/my-page")}>
        <Image src={Mypage} alt="Profile" width={24} height={24} />
        <ButtonText>마이</ButtonText>
      </NavButton>
    </NavContainer>
  );
};

export default NavigationBar;

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
`;

const ButtonText = styled.span`
  margin-top: 0.3rem;
  font-size: 0.75rem;
  color: grey;
  font-weight: normal;
`;

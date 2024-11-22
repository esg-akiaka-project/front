import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import Alarm from "@/public/assets/common/Alarm.svg";
import Community from "@/public/assets/common/Community.svg";
import Home from "@/public/assets/common/Home.svg";
import Mypage from "@/public/assets/common/Mypage.svg";
import Record from "@/public/assets/common/Record.svg";
import { useUserStore } from "@/src/store/useUserStore";

const NavigationBar: React.FC = () => {
  const router = useRouter();
  const { memberId } = useUserStore();

  const navigate = (path: string) => {
    const checkingPages = ["/grow-check", "/alarm", "/my-page"];
    if (checkingPages.includes(path) && memberId === null) {
      router.push("log-in");
      return;
    }
    router.push(path);
  };

  const isActive = (path: string) => {
    // 정확히 일치하는 경로(Home)에 대해서만 활성화
    if (path === "/") {
      return router.pathname === path;
    }
    // 그 외의 경로는 path로 시작하는 경우 활성화
    return router.pathname.startsWith(path);
  };
    

  return (
    <NavContainer>
      <NavButton onClick={() => navigate("/")} $active={isActive("/")}>
        <StyledImage src={Home} alt="Home" width={24} height={24} $active={isActive("/")} />
        <ButtonText  $active={isActive("/")}>홈</ButtonText>
      </NavButton>
      <NavButton onClick={() => navigate("/grow-check")} $active={isActive("/grow-check")}>
        <StyledImage src={Record} alt="Record" width={24} height={24} $active={isActive("/grow-check")} />
        <ButtonText  $active={isActive("/grow-check")}>도약기록</ButtonText>
      </NavButton>
      <NavButton onClick={() => navigate("/community")} $active={isActive("/community")}>
        <StyledImage src={Community} alt="Community" width={24} height={24} $active={isActive("/community")} />
        <ButtonText  $active={isActive("/community")}>서로도약</ButtonText>
      </NavButton>
      <NavButton onClick={() => navigate("/alarm")} $active={isActive("/alarm")}>
        <StyledImage src={Alarm} alt="Notifications" width={24} height={24} $active={isActive("/alarm")} />
        <ButtonText  $active={isActive("/alarm")}>알림</ButtonText>
      </NavButton>
      <NavButton onClick={() => navigate("/my-page")} $active={isActive("/my-page")}>
        <StyledImage src={Mypage} alt="Profile" width={24} height={24} $active={isActive("/my-page")} />
        <ButtonText  $active={isActive("/my-page")}>마이</ButtonText>
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
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  border-radius: 14px 14px 0px 0px;
`;

const NavButton = styled.button<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
`;

const StyledImage = styled(Image)<{ $active: boolean }>`
  filter: ${({ $active }) => ($active ? "invert(45%) sepia(8%) saturate(1611%) hue-rotate(104deg) brightness(89%) contrast(89%)" : "none")};
`;

const ButtonText = styled.span<{ $active: boolean }>`
  margin-top: 0.3rem;
  font-size: 0.7rem;
  color: ${({ $active }) => ($active ? "var(--main-green)" : "var(--gray-from-grayscale)")};
  font-weight: normal;
`;

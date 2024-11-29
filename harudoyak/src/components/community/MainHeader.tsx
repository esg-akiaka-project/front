import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

export const MainHeaderLayout = styled.div<{ isVisible: boolean }>`
  width: 100%;
  max-width: 480px;
  height: 61px;
  position: fixed;
  top: ${({ isVisible }) =>
    isVisible ? "0" : "-61px"}; /* 스크롤에 따라 숨기기 */
  z-index: 1;
  display: flex;
  justify-content: start;
  background-color: var(--background);
  border: solid var(--lightgray-from-grayscale);
  border-width: 0.5px 0;
  box-sizing: border-box;
  padding: 0 17px 0 17px;
  transition: top 0.5s ease-in-out;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: var(--sub-green1);
  cursor: pointer; /* 클릭 가능하도록 커서 변경 */
  padding-bottom: 10px;
`;

interface MainHeaderProps {
  onClick?: () => void; // 부모에서 전달받을 onClick 속성
}

const MainHeader: React.FC<MainHeaderProps> = ({ onClick }) => {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(true); // 헤더 가시성 상태
  const [lastScrollY, setLastScrollY] = useState(0); // 마지막 스크롤 위치

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 아래로 스크롤하면 헤더 숨기기, 위로 스크롤하면 헤더 보이기
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY); // 마지막 스크롤 위치 업데이트
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]); // 마지막 스크롤 위치에 따라 업데이트

  const handleLogoClick = () => {
    if (onClick) {
      onClick(); // 부모에서 전달받은 onClick 실행
    }
    router.push("/community#top"); // 최상단 게시글로 이동
  };

  return (
    <MainHeaderLayout isVisible={isVisible}>
      <Title onClick={handleLogoClick}>서로도약</Title>
    </MainHeaderLayout>
  );
};

export default MainHeader;

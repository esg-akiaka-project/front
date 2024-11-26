// src/components/community/SideHeader.tsx
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const SideHeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: var(--main-green);
  display: flex;
  align-items: center;
  padding-left: 16px;
  z-index: 1000;
`;

const SideHeaderText = styled.h2`
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
`;

const SideHeader: React.FC = () => {
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <SideHeaderContainer onClick={scrollToTop}>
      <SideHeaderText>서로도약</SideHeaderText>
    </SideHeaderContainer>
  );
};

export default SideHeader;

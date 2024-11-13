import React from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import harudoyaklogo from "@/public/assets/common/OptimizedLogo.svg";

// 애니메이션 정의: 페이드인 + 살짝 확대되는 효과
const fadeInAndScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// 스타일드 컴포넌트 정의
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  animation: ${fadeInAndScale} 1.5s ease-in-out;
`;

const Logo: React.FC = () => {
  return (
    <ImageWrapper>
      <Image src={harudoyaklogo.src} alt="logo" width={290} height={290} />
    </ImageWrapper>
  );
};

export default Logo;

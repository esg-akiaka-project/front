// 컴포넌트 이름: Tooltip
// 컴포넌트 설명: i(information) 아이콘과 함께 Tooltip(도움말)을 제공하는 컴포넌트
// 주 사용처: 도약기록 쓰기의 도약 태그 설명, 메인화면 등에서 사용
// 저장 위치: src/components/commom/Tooltip.tsx

// Dev Log
// 최초 작성일/작성자: 2024.10.29./루이
// 수정일/작성자:

import React from "react";
import styled, { keyframes } from "styled-components";

interface TooltipProps {
  children: React.ReactNode;
  message: string;
  direction?: string;
}

const Tooltip = ({ children, message }: TooltipProps) => {
  return (
    <Wrapper>
      {children}
      {/* dangerouslySetInnerHTML로 HTML 처리 */}
      <Content dangerouslySetInnerHTML={{ __html: message }} />
    </Wrapper>
  );
};

export default Tooltip;

const tooltip = keyframes`
  0% { opacity: 0; }
  40% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 1;}
`;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Content = styled.div`
  visibility: hidden;
  background-color: rgba(60, 121, 96, 0.8);
  color: #ffffff;
  text-align: left;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #3c7960;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 0;
  transform: translateX(-30%);
  opacity: 0;
  min-width: 200px;
  margin-bottom: 2px;
  font-size: 0.75rem;

  ${Wrapper}:hover & {
    visibility: visible;
    opacity: 1;
    animation: ${tooltip} 0.5s ease-in-out;
  }

  strong {
    font-weight: bold;
  }
`;

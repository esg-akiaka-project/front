// 컴포넌트 이름: Tag
// 컴포넌트 설명: 도약태그 1개
// 주 사용처: 도약기록 쓰기, 도약기록 확인 기능에서 활용 -> Tag.tsx는 태그 딱 하나라서, 가로로 정렬된 태그들을 사용하고 싶으시면 Tags.tsx 파일을 사용하시면 됩니다!
// 저장 위치: src/components/commom/Tag.tsx

// Dev Log
// 최초 작성일/작성자: 2024.10.29./루이
// 수정일/작성자:

import React from "react";
import styled from "styled-components";

interface TagProps {
  children: React.ReactNode;
}

const Tag: React.FC<TagProps> = ({ children }) => {
  return <StyledTag>#{children}</StyledTag>;
};

export default Tag;

const StyledTag = styled.div`
  background: #ffffff;
  border-radius: 15px;
  padding: 5px 11px;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
  color: var(--main-green);
  white-space: nowrap;
  font-size: 0.75rem;
`;

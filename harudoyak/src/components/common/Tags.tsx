// 컴포넌트 이름: Tags
// 컴포넌트 설명: tagslist를 props로 받아서, 그 길이만큼 Tag를 만들고 가로로 정렬하는 컴포넌트 
// 주 사용처: 도약기록 쓰기, 도약기록 확인 기능에서 활용
// 저장 위치: src/components/commom/Tags.tsx

// Dev Log
// 최초 작성일/작성자: 2024.10.29./루이
// 수정일/작성자: 

import React from "react";
import styled from "styled-components";
import Tag from './Tag';

interface TagsProps {
  tagslist: string[];
}

const Tags: React.FC<TagsProps> = ({ tagslist }) => {
  return (
    <Wrapper>
      {tagslist.map((tag, index)=> (
        <Tag key={index}>{tag}</Tag>
      ))}
    </Wrapper>
  );
};

export default Tags;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;
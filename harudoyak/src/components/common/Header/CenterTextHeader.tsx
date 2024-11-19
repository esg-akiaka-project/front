// 컴포넌트 이름: CenterTextHeader
// 컴포넌트 설명: 좌측: X / 중앙: Heading Text / 우측: 작은 완료 버튼이 들어간 상단 헤더
// 주 사용처: '도약기록 쓰기', 회원가입 flow에서 활용 가능
// 저장 위치: src/components/commom/Header/CenterTextHeader.tsx

// Dev Log
// 최초 작성일/작성자: 2024.10.25./루이
// 수정일/작성자:

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import iconX from "@/public/assets/common/icon_X.svg";
import UndoXButton from "../../buttons/UndoXButton";
import CenterTextHeaderBtn from "./CenterTextHeaderBtn";

interface TextCenterHeaderProps {
  onFail: () => void;
}

const CenterTextHeader: React.FC<TextCenterHeaderProps> = ({ onFail }) => {
  return (
    <>
      <HeaderWrapper>
        <UndoXButton icon={iconX} />
        <Heading3>도약기록 쓰기</Heading3>
        <Link href="/grow-up-record">
          <CenterTextHeaderBtn onFail={onFail} />
        </Link>
        {/* TIP: href 속성에 라우팅하고 싶은 페이지 링크 작성*/}
      </HeaderWrapper>
    </>
  );
};

export default CenterTextHeader;

// styled components
const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 23px;
`;
const Heading3 = styled.h3`
  color: var(--main-green);
  font-size: 1.25rem;
`;

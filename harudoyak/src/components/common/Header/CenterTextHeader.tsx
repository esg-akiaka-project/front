import React from "react";
import styled from "styled-components";
import Link from "next/link";

import UndoXButton from "../../buttons/UndoXButton";
import CenterTextHeaderBtn from "./CenterTextHeaderBtn";

const CenterTextHeader: React.FC = () => {
  return (
    <>
      <HeaderWrapper>
        <UndoXButton />
        <Heading3>도약기록 쓰기</Heading3>
        <Link href='/grow-check'><CenterTextHeaderBtn /></Link>
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

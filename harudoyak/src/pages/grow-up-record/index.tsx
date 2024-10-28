import React from "react";
import styled from "styled-components";
import Link from "next/link";

import UndoXButton from "../../components/buttons/UndoXButton";

import Emotions from "../../components/grow-up-record/Emotions";
import TextEntryButton from '../../components/grow-up-record/TextEntryButton';

const GrowUpRecordHome: React.FC = () => {
  return (
    <Root>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row-reverse' }}> 
        <UndoXButton />
      </div>
      <Heading3>오늘의 도약을 기록해 주세요.</Heading3>
      <Heading2>오늘의 감정</Heading2>
      <Emotions />
      <Heading2 style={{marginBottom: '8px'}}>오늘의 도약 기록</Heading2>
      <Link href='/writing-page'><TextEntryButton/></Link>
    </Root>
  );
};

export default GrowUpRecordHome;

// styled-component
const Root = styled.div`
  min-height: 80vh; /* Viewport Height, 화면 전체 높이 */
  padding: 0;
  max-width: 1100px;
  margin-top: 63px;

  @media screen and (max-width: 768px) {
    //모바일 환경
    margin-left: 1.44rem;
    margin-right: 1.44rem;
  }
  @media screen and (min-width: 768px) {
    //pc 환경
    margin-left: 1.44rem;
    margin-right: 1.44rem;
  }
`;

const Heading3 = styled.h3`
  font-size: 1.44rem;
  color: var(--main-green);
`;

const Heading2 = styled.h2`
  font-size: 1.56rem;
  color: var(--sub-green2);
  margin-bottom: 12px;
  margin-top: 30px;
`;

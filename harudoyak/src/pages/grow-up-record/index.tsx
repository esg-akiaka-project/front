import React from "react";
import styled from "styled-components";

import Emotions from "../../components/grow-up-record/Emotions";
import UndoXButton from '../../components/buttons/UndoXButton';

const GrowUpRecordHome: React.FC = () => {
  return (
    <Root>
      <UndoXButton />
      <Heading3>오늘의 도약을 기록해 주세요.</Heading3>
      <Heading2>오늘의 감정</Heading2>
      <Emotions />
    </Root>
  );
};

export default GrowUpRecordHome;

const Root = styled.div`
  min-height: 80vh; /* Viewport Height, 화면 전체 높이 */
  padding: 0;
  max-width: 1100px;
  margin-top: 63px;

  @media screen and (max-width: 768px) {
    //모바일 환경
    margin-left: 1.44rem;
  }
  @media screen and (min-width: 768px) {
    //pc 환경
    margin-left: 1.44rem;
    margin-right: 220px;
  }
`;

const Heading3 = styled.h3`
  font-size: 1.44rem;
  color: var(--main-green);
`;

const Heading2 = styled.h2`
  font-size: 1.56rem;
  color: var(--sub-green2);
`;

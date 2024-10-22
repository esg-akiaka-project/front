import React from "react";
import styled from "styled-components";

import {
  emotion1,
  emotion2,
  emotion3,
  emotion4,
  emotion5,
  emotion6,
  emotion7,
  emotion8,
} from "../../../public/assets/grow-up-record";

const Emotions: React.FC = () => {
  return (
    <Root>
      <Emotion src={emotion1} />
      <Emotion src={emotion2} />
      <Emotion src={emotion3} />
      <Emotion src={emotion4} />
      <Emotion src={emotion5} />
      <Emotion src={emotion6} />
      <Emotion src={emotion7} />
      <Emotion src={emotion8} />
    </Root>
  );
};

export default Emotions;

// styled-components
const Root = styled.div`
  min-height: 80vh; /* Viewport Height, 화면 전체 높이 */
  padding: 0;
  max-width: 1100px;

  // layout
  @media screen and (max-width: 768px) {
    //모바일 환경
    margin-left: 15px;
    margin-right: 15px;
  }
  @media screen and (min-width: 768px) {
    //pc 환경
    margin-left: 220px;
    margin-right: 220px;
  }
`;

const Emotion = styled.img`
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    /* 마우스 오버 시 효과 */
  }
`;

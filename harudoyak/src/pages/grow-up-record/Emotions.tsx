import React from "react";
import Image from "next/image";
import styled from "styled-components";

import {
  emotion1,
  emotion2,
  emotion3,
  emotion4,
  emotion5,
  emotion6,
  emotion7,
} from "../../assets/grow-up-record";

const Emotions: React.FC = () => {
  return (
    <Root>
      <StyledBtn>
        <Image src={emotion1} alt="사랑" />
      </StyledBtn>
      <StyledBtn>
        <Image src={emotion2} alt="기쁨" />
      </StyledBtn>
      <StyledBtn>
        <Image src={emotion3} alt="슬픔" />
      </StyledBtn>
      <StyledBtn>
        <Image src={emotion4} alt="화남" />
      </StyledBtn>
      <StyledBtn>
        <Image src={emotion5} alt="놀람" />
      </StyledBtn>
      <StyledBtn>
        <Image src={emotion6} alt="재밌음" />
      </StyledBtn>
      <StyledBtn>
        <Image src={emotion7} alt="기타" />
      </StyledBtn>
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

const StyledBtn = styled.button`
  &:hover {
    /* 마우스 오버 시 효과 */
  }
`;

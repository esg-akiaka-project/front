import React, { useState } from "react";
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
} from "../../../public/assets/grow-up-record";

const Emotions: React.FC = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [clickedEmotion, setClickedEmotion] = useState<number>(0);

  const handleClick = (emotionNum: number): void => {
    setIsClicked(true);
    setClickedEmotion(emotionNum);

    if (clickedEmotion == emotionNum) {
      console.log("감정은 필수 메세지");
      setIsOpened(true);
    } else {
      setIsOpened(false);
    }
  };

  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <Root>
      <StyledBtn onClick={() => handleClick(1)}>
        <Image src={emotion1} alt="사랑" />
      </StyledBtn>
      <StyledBtn onClick={() => handleClick(2)}>
        <Image src={emotion2} alt="기쁨" />
      </StyledBtn>
      <StyledBtn onClick={() => handleClick(3)}>
        <Image src={emotion3} alt="슬픔" />
      </StyledBtn>
      <StyledBtn onClick={() => handleClick(4)}>
        <Image src={emotion4} alt="화남" />
      </StyledBtn>
      <StyledBtn onClick={() => handleClick(5)}>
        <Image src={emotion5} alt="놀람" />
      </StyledBtn>
      <StyledBtn onClick={() => handleClick(6)}>
        <Image src={emotion6} alt="재밌음" />
      </StyledBtn>
      <StyledBtn onClick={() => handleClick(7)}>
        <Image src={emotion7} alt="기타" />
      </StyledBtn>
      {isOpened && (
        <PopMessage>도약기록에는 오늘의 감정이 꼭 포함되어야 해요!</PopMessage>
      )}
    </Root>
  );
};

export default Emotions;

// styled-components
const Root = styled.div`
  min-height: 80vh; /* Viewport Height, 화면 전체 높이 */
  padding: 0;
  max-width: 1100px;
`;

const StyledBtn = styled.button`
  width: 2.75rem;
  height: 2.75rem;
  margin-right: 2%;
  border: 0px;
  border-radius: 10px;
  background: none;
  &:hover {
    background: #ebebeb;
  }
`;

const PopMessage = styled.div`
  color: var(--gray-from-grayscale);
  font-size: 0.75rem;
  margin-top: 10px;
  margin-left: 12px;
`;

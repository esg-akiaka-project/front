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
  const [clickedEmotion, setClickedEmotion] = useState<number>(0);

  const handleClick = (emotionNum: number): void => {
    setClickedEmotion(emotionNum);

    if (clickedEmotion === emotionNum || clickedEmotion === 0) {
      setIsOpened(true);
    } else {
      setIsOpened(false);
    }
  };

  const [isOpened, setIsOpened] = useState<boolean>(false); // pop message open 여부

  return (
    <Root>
      <StyledBtn
        $isSelected={clickedEmotion === 1}
        onClick={() => handleClick(1)}
      >
        <Image src={emotion1} alt="사랑" />
      </StyledBtn>
      <StyledBtn
        $isSelected={clickedEmotion === 2}
        onClick={() => handleClick(2)}
      >
        <Image src={emotion2} alt="기쁨" />
      </StyledBtn>
      <StyledBtn
        $isSelected={clickedEmotion === 3}
        onClick={() => handleClick(3)}
      >
        <Image src={emotion3} alt="슬픔" />
      </StyledBtn>
      <StyledBtn
        $isSelected={clickedEmotion === 4}
        onClick={() => handleClick(4)}
      >
        <Image src={emotion4} alt="화남" />
      </StyledBtn>
      <StyledBtn
        $isSelected={clickedEmotion === 5}
        onClick={() => handleClick(5)}
      >
        <Image src={emotion5} alt="놀람" />
      </StyledBtn>
      <StyledBtn
        $isSelected={clickedEmotion === 6}
        onClick={() => handleClick(6)}
      >
        <Image src={emotion6} alt="재밌음" />
      </StyledBtn>
      <StyledBtn
        $isSelected={clickedEmotion === 7}
        onClick={() => handleClick(7)}
      >
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
  padding: 0;
  max-width: 1100px;
`;

const StyledBtn = styled.button<{ $isSelected: boolean }>`
  display: inline-block;
  padding: 6px 6px;
  line-height: normal;
  text-align: center;
  cursor: pointer;
  width: auto;
  height: 0 auto;
  margin-right: 0.7%;
  border: 0px;
  border-radius: 10px;
  background: ${({ $isSelected }) => ($isSelected ? "#ebebeb" : "#F2F6F3")};

  box-shadow: ${({ $isSelected }) => ($isSelected ? '1px 1px 2px 0px rgba(0, 0, 0, 0.1)': 'none')};
  
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

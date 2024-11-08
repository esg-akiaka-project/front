import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

import {
  love,
  happy,
  sad,
  angry,
  surprise,
  funny,
  etc,
} from "../../../public/assets/grow-up-record";

interface EmotionsProps {
  emotion: string;
  updateEmotion: (emotion: string) => void;
}

const Emotions: React.FC<EmotionsProps> = ({ emotion, updateEmotion }) => {
  const handleClick = (emotionData: string): void => {
    updateEmotion(emotionData);
    console.log(emotionData);

    //isOpened 제어 코드
    if (emotion === emotionData) {
      setIsOpened(true);
    } else {
      setIsOpened(false);
    }
  };

  const [isOpened, setIsOpened] = useState<boolean>(true); // pop message open 여부

  //const router = useRouter();

  return (
    <Root>
      <StyledBtn
        $isSelected={emotion === "love"}
        onClick={() => handleClick("love")}
      >
        <Image src={love} alt="사랑" />
      </StyledBtn>
      <StyledBtn
        $isSelected={emotion === "happy"}
        onClick={() => handleClick("happy")}
      >
        <Image src={happy} alt="기쁨" />
      </StyledBtn>
      <StyledBtn
        $isSelected={emotion === "sad"}
        onClick={() => handleClick("sad")}
      >
        <Image src={sad} alt="슬픔" />
      </StyledBtn>
      <StyledBtn
        $isSelected={emotion === "angry"}
        onClick={() => handleClick("angry")}
      >
        <Image src={angry} alt="화남" />
      </StyledBtn>
      <StyledBtn
        $isSelected={emotion === "surprised"}
        onClick={() => handleClick("surprised")}
      >
        <Image src={surprise} alt="놀람" />
      </StyledBtn>
      <StyledBtn
        $isSelected={emotion === "fun"}
        onClick={() => handleClick("fun")}
      >
        <Image src={funny} alt="재밌음" />
      </StyledBtn>
      <StyledBtn
        $isSelected={emotion === "etc"}
        onClick={() => handleClick("etc")}
      >
        <Image src={etc} alt="기타" />
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

  box-shadow: ${({ $isSelected }) =>
    $isSelected ? "1px 1px 2px 0px rgba(0, 0, 0, 0.1)" : "none"};

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

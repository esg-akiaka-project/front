import React from "react";
import styled from "styled-components";

interface EmotionProps {
  emotions: Record<string, number>;
}

const EmotionDiv: React.FC<EmotionProps> = ({ emotions }) => {
  const emotionArray = Object.entries(emotions)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  const mainEmotion = emotionArray[0];
  const otherEmotions = emotionArray;

  return (
    <EmotionContainer>
      {mainEmotion && (
        <MainEmotion>
          <EmotionImage
            src={`/assets/grow-up-record/${mainEmotion[0]}.svg`}
            alt={mainEmotion[0]}
          />
        </MainEmotion>
      )}
      <EmotionList numEmotions={otherEmotions.length}>
        {otherEmotions.map(([emotion, count], index) => (
          <EmotionItem key={index}>
            <EmotionImageSmall
              src={`/assets/grow-up-record/${emotion}.svg`}
              alt={emotion}
            />
            <EmotionCount>{count}</EmotionCount>
          </EmotionItem>
        ))}
      </EmotionList>
    </EmotionContainer>
  );
};

export default EmotionDiv;

const EmotionContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f2f6f3;
  border-radius: 1rem;
`;

const MainEmotion = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmotionImage = styled.img`
  width: 80px;
  height: 80px;
`;

const EmotionList = styled.div<{ numEmotions: number }>`
  display: grid;
  grid-template-columns: ${({ numEmotions }) =>
    numEmotions <= 4 ? `repeat(1, auto)` : `repeat(2, auto)`};
  gap: 0.5rem;
  justify-items: center;
  align-items: center;
`;

const EmotionItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 0.3rem 0.6rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EmotionImageSmall = styled.img`
  width: 24px;
  height: 24px;
`;

const EmotionCount = styled.span`
  margin-left: 0.4rem;
  font-size: 0.9rem;
  color: #333;
`;

import React from "react";
import styled from "styled-components";
import {
  love,
  happy,
  sad,
  angry,
  surprise,
  funny,
  etc,
} from "@/public/assets/grow-up-record";
interface EmotionProps {
  emotions: Record<string, number>; // ex) { "happy": 3, "sad": 2, "angry": 0 }
}

const EmotionDiv: React.FC<EmotionProps> = ({ emotions }) => {
  // 감정 목록에서 0이 아닌 항목만 필터링하여 배열로 변환
  const emotionArray = Object.entries(emotions)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]); // 개수가 많은 순서대로 정렬

  const mainEmotion = emotionArray[0]; // 가장 많은 감정
  const otherEmotions = emotionArray.slice(1); // 나머지 감정

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
      <EmotionList>
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

const EmotionList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto); /* 두 열 */
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

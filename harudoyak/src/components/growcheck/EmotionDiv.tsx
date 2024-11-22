import React from "react";
import styled from "styled-components";

interface EmotionProps {
  emotions: Record<string, number>;
  type: string;
}

const EmotionDiv: React.FC<EmotionProps> = ({ emotions, type }) => {
  const emotionMapping: Record<string, string> = {
    hearts: "love",
    laughing: "happy",
    tear: "sad",
    rage: "angry",
    hushed: "surprise",
    star: "funny",
    question: "etc",
  };

  const emotionArray = Object.entries(emotions)
    .filter(([_, count]) => count > 0)
    .map(([emotion, count]) => [emotionMapping[emotion] || emotion, count]) // 매핑된 감정 사용
    .sort((a, b) => (b[1] as number) - (a[1] as number));

  const mainEmotion = emotionArray[0];
  const otherEmotions = emotionArray;

  return (
    <EmotionContainer>
      {mainEmotion && (
        <MainEmotion type={type}>
          <EmotionImage
            type={type}
            src={`/assets/grow-up-record/${mainEmotion[0]}.svg`}
            alt={String(mainEmotion[0])}
          />
        </MainEmotion>
      )}

      {/* 오늘의 도약 기록에서는 감정 리스트를 출력하지 않음 
      -> type이 "Today"가 아닐 때만 EmotionList를 출력할 수 있도록 조건부 렌더링 */}
      {type !== "Today" && (
        <EmotionList $numEmotions={otherEmotions.length}>
          {otherEmotions.map(([emotion, count], index) => (
            <EmotionItem key={index}>
              <EmotionImageSmall
                src={`/assets/grow-up-record/${emotion}.svg`}
                alt={String(mainEmotion[0])}
              />
              <EmotionCount index={index}>{count}</EmotionCount>
            </EmotionItem>
          ))}
        </EmotionList>
      )}
    </EmotionContainer>
  );
};

export default EmotionDiv;

const EmotionContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f6f3;
  border-radius: 1rem;
`;

const MainEmotion = styled.div<{ type: string }>`
  flex: 1;
  display: flex;
  justify-content: ${({ type }) =>
    type === "Today" ? "flex-start" : "center"};
  align-items: center;
`;

const EmotionImage = styled.img<{ type: string }>`
  width: ${({ type }) => (type === "Today" ? "55px" : "90px")};
  height: ${({ type }) => (type === "Today" ? "55px" : "90px")};
  margin: ${({ type }) => (type === "Today" ? "16px" : "")};
  margin-bottom: ${({ type }) => (type === "Today" ? "30px" : "")};
  transform: ${({ type }) => (type === "Today" ? "" : "translateX(-25%)")};
  filter: drop-shadow(0px 0px 25px rgba(125, 180, 157, 0.6));
`;

const EmotionList = styled.div<{ $numEmotions: number }>`
  display: grid;
  grid-template-columns: ${({ $numEmotions }) =>
    $numEmotions <= 4 ? `repeat(1, auto)` : `repeat(2, auto)`};
  gap: 0.5rem;
  justify-items: center;
  align-items: center;
  margin-right: 15px;
`;

const EmotionItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 0.25rem 0.9rem;
  gap: 0.7rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EmotionImageSmall = styled.img`
  width: 24px;
  height: 24px;
`;

const EmotionCount = styled.span<{ index: number }>`
  margin-left: 0.4rem;
  font-size: 14px;
  font-weight: bold;
  color: ${({ index }) =>
    index === 0 ? "var(--main-green)" : "var(--sub-green3)"};
`;

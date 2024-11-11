import React, { useState } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import EmotionDiv from "./EmotionDiv";
import Tags from "./Tags";

const MonthFeel: React.FC = () => {
  // dummyData todo: api 연동 후 적용
  const [monthTags, setMonthTags] = useState<string[]>([
    "123",
    "abc",
    "배고파",
    "커피",
    "테스트",
    "프로그래밍",
    "React",
    "CSS",
    "비즈니스테크놀로지",
  ]);
  const [emotion, setEmotion] = useState<Record<string, number>>({
    happy: 3,
    sad: 2,
    funny: 4,
    surprise: 1,
    etc: 1,
    love: 8,
    angry: 5,
  });
  return (
    <Container>
      <SectionTitle>이번 달의 감정</SectionTitle>
      <EmotionDiv emotions={emotion} />
      <SectionTitle>이번 달 도약태그</SectionTitle>
      <Tags tags={monthTags} />
      <ParellelWrapper>
        <SectionTitle>이번 달 하루도약</SectionTitle>
        <Circle number={21}></Circle>
      </ParellelWrapper>
    </Container>
  );
};
export default MonthFeel;

const Container = styled.div`
  background-color: #f2f6f3;
  border-radius: 2rem 2rem 0 0;
  padding: 1.5rem;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  margin-top: 2rem;
`;
const SectionTitle = styled.h2`
  font-size: 1.6rem;
  color: #3c7960;
  margin-bottom: 1rem;
`;
const ParellelWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 1rem;
`;
interface CircleProps {
  number: number;
}

const Circle: React.FC<CircleProps> = ({ number }) => (
  <StyledCircle>{number}</StyledCircle>
);
const StyledCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3rem;
  background-color: white;
  width: 1.3rem;
  height: 1.3rem;
  font-size: 1rem;
  font-weight: bold;
  color: #3c7960;
`;

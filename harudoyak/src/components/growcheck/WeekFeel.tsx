import React, { useState } from "react";
import Root from "@/src/style/Root";
import styled from "styled-components";
import Tags from "./Tags";
import EmotionDiv from "./EmotionDiv";

interface WeekProps {
  onDayClick: (date: Date) => void;
}

const WeekFeel: React.FC<WeekProps> = ({ onDayClick }) => {
  const [weeklyTags, setWeeklyTags] = useState<string[]>([
    // dummy
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

  // 감정 dummyData:
  const [emotion, setEmotion] = useState<Record<string, number>>({
    happy: 3,
    sad: 2,
  });
  return (
    <>
      <Container>
        <SectionTitle>이번주의 감정</SectionTitle>
        <EmotionDiv emotions={emotion} />
        <SectionTitle>이번주 도약 태그</SectionTitle>
        <Tags tags={weeklyTags} />

        <SectionTitle>이번주 하루도약</SectionTitle>
        <SectionTitle>도약이의 우체통</SectionTitle>
      </Container>
    </>
  );
};
export default WeekFeel;

const Container = styled.div`
  background-color: #f2f6f3;
  border-radius: 2rem 2rem 0 0;
  padding: 1.5rem;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: ;
  color: #3c7960;
  margin-bottom: 1rem;
`;

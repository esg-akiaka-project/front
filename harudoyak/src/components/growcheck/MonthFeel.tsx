import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EmotionDiv from "./EmotionDiv";
import Tags from "./Tags";
import Circle from "./Circle";
import { MonthlyRecord } from "@/src/apis/logsApi";
import { format } from "date-fns";
interface MonthProps {
  selectedDate: Date;
}
interface EmotionData {
  [key: string]: number;
}
const MonthFeel: React.FC<MonthProps> = ({ selectedDate }) => {
  console.log(selectedDate);

  const [monthTags, setMonthTags] = useState<string[]>([]);
  const [emotion, setEmotion] = useState<Record<string, number>>({});
  const [aiFeedbackCount, setAiFeedbackCount] = useState<number>(0);
  useEffect(() => {
    const fetchMonthly = async () => {
      try {
        const response = await MonthlyRecord(
          format(selectedDate, "yyyy-MM-dd")
        );
        console.log(response);
        if (response.emotions) {
          const emotionsData = response.emotions;
          const emotionsRecord: EmotionData = {};
          emotionsData.forEach(
            (item: { emotion: string; emotionCount: number }) => {
              emotionsRecord[item.emotion] = item.emotionCount;
            }
          );
          setEmotion(emotionsRecord);
        }

        if (response.tags) {
          const tagsArray = response.tags.map(
            (tagItem: { tagName: string }) => tagItem.tagName
          );
          setMonthTags(tagsArray);
        }

        if (response.aiFeedbacks && response.aiFeedbacks.length > 0) {
          setAiFeedbackCount(response.aiFeedbacks[0].aiFeedbackCount);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMonthly();
  }, [selectedDate]);
  return (
    <Container>
      <SectionTitle>이번 달의 감정</SectionTitle>
      <EmotionDiv emotions={emotion} />
      <SectionTitle>이번 달 도약태그</SectionTitle>
      <Tags tags={monthTags} />
      <ParellelWrapper>
        <SectionTitle>이번 달 하루도약</SectionTitle>
        <Circle number={aiFeedbackCount}></Circle>
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

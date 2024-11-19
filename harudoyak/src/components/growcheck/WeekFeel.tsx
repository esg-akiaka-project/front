import React, { useState, useEffect } from "react";

import styled from "styled-components";
import Tags from "./Tags";
import EmotionDiv from "./EmotionDiv";
import Mailbox from "./Mailbox";
import Circle from "./Circle";
import { WeeklyRecord } from "@/src/apis/logsApi";
import { format } from "date-fns";
interface WeekProps {
  selectedDate: Date;
}

interface MailProps {
  date?: Date;
  day?: string;
  content?: string;
}

const WeekFeel: React.FC<WeekProps> = ({ selectedDate }) => {
  const [weeklyTags, setWeeklyTags] = useState<string[]>([]);
  const [emotion, setEmotion] = useState<Record<string, number>>({});
  const [mailList, setMailList] = useState<MailProps[]>([]);

  useEffect(() => {
    const fetchWeek = async () => {
      try {
        const response = await WeeklyRecord(format(selectedDate, "yyyy-MM-dd"));

        if (response) {
          const tags = response.tags
            .slice(0, 6)
            .map((tag: { tagName: string }) => tag.tagName);
          setWeeklyTags(tags);

          const emotions = response.emotions.reduce(
            (
              acc: Record<string, number>,
              cur: { emotion: string; emotionCount: number }
            ) => {
              acc[cur.emotion] = cur.emotionCount;
              return acc;
            },
            {}
          );
          setEmotion(emotions);

          const feedbacks = response.aiFeedbacks.map(
            (feedback: { feedBackDate: string; feedback: string }) => ({
              date: new Date(feedback.feedBackDate),
              day: format(new Date(feedback.feedBackDate), "EEE").toUpperCase(),
              content: feedback.feedback,
            })
          );
          setMailList(feedbacks);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeek();
  }, [selectedDate]);
  return (
    <Container>
      <SectionTitle>이번주의 감정</SectionTitle>
      <EmotionDiv emotions={emotion} />
      <SectionTitle>이번주 도약 태그</SectionTitle>
      <Tags tags={weeklyTags} />
      <ParellelWrapper>
        <SectionTitle>이번주 하루도약</SectionTitle>
        <Circle number={mailList.length} />
      </ParellelWrapper>
      <ParellelWrapper>
        <SectionTitle>도약이의 우체통</SectionTitle>
        <Circle number={mailList.length} />
      </ParellelWrapper>
      <Mailbox mailList={mailList || []} />
    </Container>
  );
};

export default WeekFeel;

// 스타일 정의
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
  color: #3c7960;
  margin-bottom: 1rem;
`;

const ParellelWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 1rem;
`;

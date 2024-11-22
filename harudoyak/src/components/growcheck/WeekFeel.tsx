import React, { useState, useEffect } from "react";
import * as S from "./Feel.style";
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
              cur: { emotion: string; emotionCount: number },
            ) => {
              acc[cur.emotion] = cur.emotionCount;
              return acc;
            },
            {},
          );
          setEmotion(emotions);

          const feedbacks = response.aiFeedbacks.map(
            (feedback: { feedBackDate: string; feedback: string }) => ({
              date: new Date(feedback.feedBackDate),
              day: format(new Date(feedback.feedBackDate), "EEE").toUpperCase(),
              content: feedback.feedback,
            }),
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
    <S.Container>
      <S.SectionTitle>이번주의 감정</S.SectionTitle>
      <EmotionDiv emotions={emotion} type="Week" />
      <S.SectionTitle>이번주 도약 태그</S.SectionTitle>
      <Tags tags={weeklyTags} />
      <S.ParellelWrapper>
        <S.SectionTitle>이번주 하루도약</S.SectionTitle>
        <Circle number={mailList.length} />
      </S.ParellelWrapper>
      <S.ParellelWrapper>
        <S.SectionTitle>도약이의 우체통</S.SectionTitle>
        <Circle number={mailList.length} />
      </S.ParellelWrapper>
      <Mailbox mailList={mailList || []} />
    </S.Container>
  );
};

export default WeekFeel;

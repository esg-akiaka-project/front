import React, { useEffect, useState } from "react";
import * as S from "./Feel.style";
import EmotionDiv from "./EmotionDiv";
import Tags from "./Tags";
//import Tags from '../components/'
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
          format(selectedDate, "yyyy-MM-dd"),
        );
        console.log(response);
        if (response.emotions) {
          const emotionsData = response.emotions;
          const emotionsRecord: EmotionData = {};
          emotionsData.forEach(
            (item: { emotion: string; emotionCount: number }) => {
              emotionsRecord[item.emotion] = item.emotionCount;
            },
          );
          setEmotion(emotionsRecord);
        }

        if (response.tags) {
          const tagsArray = response.tags.map(
            (tagItem: { tagName: string }) => tagItem.tagName,
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
    <S.Container>
      <S.SectionTitle>이번 달의 감정</S.SectionTitle>
      <EmotionDiv emotions={emotion} type="Month" />
      <S.SectionTitle>이번 달 도약태그</S.SectionTitle>
      <Tags tags={monthTags} />
      <S.ParellelWrapper>
        <S.SectionTitle>이번 달 하루도약</S.SectionTitle>
        <Circle number={aiFeedbackCount}></Circle>
      </S.ParellelWrapper>
    </S.Container>
  );
};
export default MonthFeel;

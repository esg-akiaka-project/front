import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import EmotionDiv from "./EmotionDiv";
import Tags from "./Tags";
import pot from "../../../public/assets/grow-up-record/pot.svg";

import Image from "next/image";
import { useLogsStore } from "@/src/store/useLogStore";
import { DailyRecord } from "@/src/apis/logsApi";
import { useUserStore } from "@/src/store/useUserStore";

interface TodayProps {
  selectedDay: Date;
}

interface MailProps {
  date?: Date;
  day?: string;
  content?: string;
}

const TodayFeel: React.FC<TodayProps> = ({ selectedDay }) => {
  const { getLogByDate } = useLogsStore();

  const { aiName } = useUserStore();

  const [todayDoyak, setTodayDoyak] = useState<Record<string, string>>({
    content: "",
    url: "",
  });
  const [emotion, setEmotion] = useState<Record<string, number>>({});
  const [weeklyTags, setWeeklyTags] = useState<string[]>([]);
  const [todayMail, setTodayMail] = useState<MailProps>({});
  const [logId, setLogId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedDay) {
      const formattedDate = selectedDay.toLocaleDateString("en-CA");
      const fetchedLogId = getLogByDate(formattedDate);
      setLogId(fetchedLogId);
    }
  }, [selectedDay, getLogByDate]);

  useEffect(() => {
    if (logId !== null) {
      const fetchDaily = async (logId: number) => {
        try {
          const response = await DailyRecord(logId);
          if (response && response.length > 0) {
            const record = response[0];
            setTodayDoyak({
              content: record["logContent"] || "기록이 없습니다.",
              url: record["logImageUrl"] || "",
            });
            setWeeklyTags(
              record["tagNameList"]?.map(
                (tag: { tagName: string }) => tag.tagName,
              ) || [],
            );
            setEmotion({
              [record["emotion"]]: 1,
            });
            setTodayMail({
              date: record["letterCreationDate"]
                ? new Date(record["letterCreationDate"])
                : undefined,
              day: record["letterCreationDate"]
                ? format(
                    new Date(record["letterCreationDate"]),
                    "EEE",
                  ).toUpperCase()
                : undefined,
              content:
                record["letterContent"] ?? "도약이의 편지가 아직 없습니다.",
            });
          }
        } catch (error) {
          console.error("Error fetching daily record:", error);
        }
      };

      fetchDaily(logId);
    } else {
      resetData();
    }
  }, [logId]);

  const resetData = () => {
    setTodayDoyak({
      content: "데이터가 없어요",
      url: "",
    });
    setWeeklyTags([]);
    setEmotion({});
    setTodayMail({
      content: "도약이의 편지가 아직 없습니다.",
    });
  };

  return (
    <Container>
      <SectionTitle>{format(selectedDay, "MMMM dd")}</SectionTitle>
      <SectionTitle>오늘의 감정</SectionTitle>
      <EmotionDiv emotions={emotion} />
      <SectionTitle>오늘의 도약기록</SectionTitle>
      <DoyakContent>{todayDoyak.content}</DoyakContent>
      <SectionTitle>오늘의 도약태그</SectionTitle>
      <Tags tags={weeklyTags} />

      <SectionTitle>{aiName}의 편지</SectionTitle>
      <MailWrapper>
        {todayMail.content}
        <p></p>
        {todayMail.date ? format(todayMail.date, "yyyy-MM-dd") : ""}
        <PotImageWrapper>
          <Image src={pot} width={50} height={50} alt="pot" />
        </PotImageWrapper>
      </MailWrapper>
    </Container>
  );
};

export default TodayFeel;

const DoyakContent = styled.div`
  border-radius: 2rem;
  background-color: white;
  border: 0.5px solid #3c7960;
  padding: 1rem;
  font-color: grey;
  height: 100%;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  color: #3c7960;
  margin-bottom: 1rem;
`;

const Container = styled.div`
  background-color: #f2f6f3;
  border-radius: 2rem 2rem 0 0;
  padding: 1.5rem;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

const MailWrapper = styled.div`
  position: relative;
  background-color: #e6efe5;
  border-radius: 2rem;
  padding: 1rem;
  color: #767676;
  margin-bottom: 1rem;
  box-shadow: 0.2rem 0.2rem 0.2rem 0.2rem #d5d5d5;
`;

const PotImageWrapper = styled.div`
  position: absolute;
  bottom: -1rem;
  right: 1rem;
  z-index: 1;
`;

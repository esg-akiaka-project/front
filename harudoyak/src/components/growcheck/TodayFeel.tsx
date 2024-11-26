import React, { useEffect, useState } from "react";
import * as S from "./Feel.style";
import { format } from "date-fns";
import EmotionDiv from "./EmotionDiv";
import Tags from "../common/Tags";
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
  const [todayTags, setTodayTags] = useState<string[]>([]);
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
            console.log(response);
            const record = response[0];
            setTodayDoyak({
              content: record["logContent"] || "기록이 없습니다.",
              url: record["logImageUrl"] || "",
            });
            setTodayTags(
              record["tagNameList"]?.map(
                (tag: { tagName: string }) => tag.tagName,
              ) || [],
            );
            console.log(todayTags);
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
    setTodayTags([]);
    setEmotion({});
    setTodayMail({
      content: "도약이의 편지가 아직 없습니다.",
    });
  };

  return (
    <S.Container>
      <S.DateTitle>{format(selectedDay, "MMMM dd")}</S.DateTitle>
      <S.SectionTitle>오늘의 감정</S.SectionTitle>
      <EmotionDiv emotions={emotion} type="Today" />

      <S.MarginSectionTitle>오늘의 도약기록</S.MarginSectionTitle>
      <S.DoyakContent>{todayDoyak.content}</S.DoyakContent>

      <S.MarginSectionTitle>오늘의 도약태그</S.MarginSectionTitle>
      <Tags tagslist={todayTags} />

      <S.MarginSectionTitle style={{ marginTop: "43px" }}>
        {aiName}의 편지
      </S.MarginSectionTitle>
      <S.MailWrapper>
        {todayMail.content}
        <p></p>
        {todayMail.date
          ? `${format(todayMail.date, "yyyy-MM-dd")} ${aiName}`
          : ""}
        <S.PotImageWrapper>
          <Image src={pot} width={50} height={50} alt="pot" />
        </S.PotImageWrapper>
      </S.MailWrapper>
      <S.BottomMargin />
    </S.Container>
  );
};

export default TodayFeel;

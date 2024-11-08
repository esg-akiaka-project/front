import React, { useState } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import EmotionDiv from "./EmotionDiv";
import Tags from "./Tags";
import pot from "../../../public/assets/grow-up-record/pot.svg";
import Image from "next/image";
interface TodayProps {
  selectedDay: Date;
}

interface MailProps {
  date?: Date;
  day?: string;
  content?: string;
}
// dummyData todo: api 연동후 적용
const TodayFeel: React.FC<TodayProps> = ({ selectedDay }) => {
  const [emotion, setEmotion] = useState<Record<string, number>>({
    happy: 1,
  });
  const [weeklyTags, setWeeklyTags] = useState<string[]>([
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

  const [todayMail, setTodayMail] = useState<MailProps>({
    date: new Date("2024-10-17"),
    day: "TUE",
    content:
      "가이드북을 잘 작성한 건 훌륭하지만, 다른 업무에 충분히 시간을 할애하지 못한 점은 아쉬웠을 거야.  \
            앞으로는 문서 작업 시간을 미리 계획하고 균형 있게 배분하면 더 효율적일 것 같아. \
            회의 공지도 미리 챙기지 못한 부분은 일정 관리를 더 꼼꼼히 해서 놓치지 않도록 캘린더로 관리하는 게 좋겠어.\
    WAS 개념과 이메일 작성법을 배운 건 실무에 큰 도움이 될 테니, 바로 적용해보면 좋을 것 같아. \
    GitHub 리포지토리 작업도 익숙해졌으니 더 많은 프로젝트에서 자신 있게 활용해봐! ",
  });
  return (
    <Container>
      <SectionTitle>{format(selectedDay, "MMMM dd")}</SectionTitle>
      <SectionTitle>오늘의 감정</SectionTitle>
      <EmotionDiv emotions={emotion} />
      <SectionTitle>오늘의 도약기록</SectionTitle>

      <SectionTitle>오늘의 도약태그</SectionTitle>
      <Tags tags={weeklyTags} />

      <SectionTitle>도약이의 편지</SectionTitle>
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
  position: relative; /* 자식 요소의 absolute 포지셔닝 기준 */
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

import React, { useState } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import EmotionDiv from "./EmotionDiv";
import Tags from "./Tags";
import pot from "../../../public/assets/grow-up-record/pot.svg";
import Image from "next/image";
import useLogsStore from "@/src/store/useLogStore";

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
  const formattedDate = selectedDay.toISOString().split("T")[0];
  const { getLogByDate } = useLogsStore();
  const logId = getLogByDate(formattedDate);
  // todo: logId가 없을 경우 기록이 없다는 표시를, 있으면 api 요청을 통해 데이터를 불러와야함

  const [todayDoyak, setTodayDoyak] = useState<Record<string, string>>({
    content:
      "성취 Github 가이드북을 직접 만들고 배포했다. 학교별 아카이브에도\
        올렸는데 다른 학교 회장단 분들도 편하게 사용했으면 좋겠다! 오늘 친해지고\
        싶었던 개발자분께 먼저 말을 걸었다! 역시 얘기해 보니깐 배울 점 많고 멋진\
        분이셔서 앞으로도 더 친해지고 싶다! 개선 가이드북을 최대한 꼼꼼하게\
        작성하려고 하다보니 너무 많은 시간을 쏟느라 다른 일을 많이 못했다. -\
        새로운 문서 제작이 오래 걸리니깐 문서 작업하는 날 생각해서 작업 로드\
        분배하기 프론트엔드 회의 일시와 장소를 이틀 전에는 공지해 주었어야\
        하는데 미리 챙기지 못해서 급하게 진행이 되었다.. - 내가 참석하지 않는\
        회의 일정도 캘린더에 적어두고 공지 했는지, 안 했는지 여부 꼼꼼히\
        확인하기 학습 백엔드 개발자분과 대화하면서 WAS 개념에 대해 새로 배웠다.\
        WAS와 웹 서버 구분 잘 하기!! 비즈니스 매너 중 이메일 작성법에 대해\
        배웠다. 깃헙 가이드북을 작성하면서 스터디 리포지토리 만드는 방법에 대해\
        찾아보고 고민할 수 있었다. 리포지토리 간 PR 요청도 먼저 해보니깐 이제\
        익숙해졌다!",
    url: "url",
  });
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
      <DoyakContent>{todayDoyak.content}</DoyakContent>
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

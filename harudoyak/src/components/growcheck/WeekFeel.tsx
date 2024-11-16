import React, { useState } from "react";

import styled from "styled-components";
import Tags from "./Tags";
import EmotionDiv from "./EmotionDiv";
import Mailbox from "./Mailbox";
import Circle from "./Circle";

interface WeekProps {
  onDayClick: (date: Date) => void;
}

interface MailProps {
  date?: Date;
  day?: string;
  content?: string;
}
// dummyData todo: api연동으로 불러와야함
const WeekFeel: React.FC<WeekProps> = ({ onDayClick }) => {
  const [weeklyTags, setWeeklyTags] = useState<string[]>([]);

  const [emotion, setEmotion] = useState<Record<string, number>>({
    happy: 3,
    sad: 2,
    funny: 4,
    surprise: 1,
    etc: 1,
  });
  const [mailList, setMailList] = useState<MailProps[]>([
    {
      date: new Date("2024-10-17"),
      day: "TUE",
      content:
        "가이드북을 잘 작성한 건 훌륭하지만, 다른 업무에 충분히 시간을 할애하지 못한 점은 아쉬웠을 거야.  \
            앞으로는 문서 작업 시간을 미리 계획하고 균형 있게 배분하면 더 효율적일 것 같아. \
            회의 공지도 미리 챙기지 못한 부분은 일정 관리를 더 꼼꼼히 해서 놓치지 않도록 캘린더로 관리하는 게 좋겠어.\
    WAS 개념과 이메일 작성법을 배운 건 실무에 큰 도움이 될 테니, 바로 적용해보면 좋을 것 같아. \
    GitHub 리포지토리 작업도 익숙해졌으니 더 많은 프로젝트에서 자신 있게 활용해봐! ",
    },
    {
      date: new Date("2024-10-19"),
      day: "THUR",
      content:
        "가이드북을 잘 완성한 점은 칭찬할 만해! 하지만 그만큼 다른 업무에 시간을 충분히 쓰지 못한 게 조금 아쉬웠을 것 같아.\
           앞으로는 문서 작업 시간을 미리 계획해서 효율적으로 나누면 여러 일들을 더 균형 있게 처리할 수 있을 거야. \
           회의 공지 부분은 일정 관리를 더 철저히 해서, 미리 공지가 나갈 수 있도록 캘린더에 기록해두고 확인하는 습관을 들이는 게 좋겠어.\
          또한, WAS 개념과 이메일 작성법을 배운 건 매우 실무적으로 도움이 될 거야. \
          이제 GitHub 리포지토리 작업도 익숙해졌으니, 앞으로 더 많은 프로젝트에서 적용하면서 자신감을 키우면 좋겠어!",
    },
  ]);
  return (
    <Container>
      <SectionTitle>이번주의 감정</SectionTitle>
      <EmotionDiv emotions={emotion} />
      <SectionTitle>이번주 도약 태그</SectionTitle>
      <Tags tags={weeklyTags} />
      <ParellelWrapper>
        <SectionTitle>이번주 하루도약</SectionTitle>
        <Circle number={7} />
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

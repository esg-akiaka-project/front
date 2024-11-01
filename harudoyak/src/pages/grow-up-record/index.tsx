import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

import Root from "../../style/Root";
import UndoXButton from "../../components/buttons/UndoXButton";
import Emotions from "../../components/grow-up-record/Emotions";
import TextEntryButton from "../../components/grow-up-record/TextEntryButton";
import ImageUpload from "../../components/grow-up-record/ImageUpload";
import EditButton from "../../components/grow-up-record/EditButton";
import Tags from "../../components/common/Tags";
import Tooltip from "../../components/common/Tooltip";
import iconTooltip from "../../../public/assets/common/icon_tooltip.svg";
import iconReload from "../../../public/assets/common/icon_reload.svg";
import SubmitButton from '../../components/grow-up-record/SubmitButton';

const GrowUpRecordHome: React.FC = () => {
  const [emotion, setEmotion] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [taglist, setTaglist] = useState<string[]>([]);
  
  const [isTooltipOpened, setIsTooltipOpened] = useState<boolean>(false);
  const handleTooltip = (): void => {
    isTooltipOpened ? setIsTooltipOpened(false) : setIsTooltipOpened(true);
  };

  const textmock = `
### 성취
1. Github 가이드북을 직접 만들고 배포했다. 학교별 아카이브에도 올렸는데 다른 학교 회장단 분들도 편하게 사용했으면 좋겠다! 
2. 오늘 친해지고 싶었던 개발자분께 먼저 말을 걸었다! 역시 얘기해 보니깐 배울 점 많고 멋진 분이셔서 앞으로도 더 친해지고 싶다! 

### 개선
1. 가이드북을 최대한 꼼꼼하게 작성하려고 하다보니 너무 많은 시간을 쏟느라 다른 일을 많이 못했다. -> 새로운 문서 제작이 오래 걸리니깐 문서 작업하는 날 생각해서 작업 로드 분배하기 
2. 프론트엔드 회의 일시와 장소를 이틀 전에는 공지해 주었어야 하는데 미리 챙기지 못해서 급하게 진행이 되었다.. -> 내가 참석하지 않는 회의 일정도 캘린더에 적어두고 공지 했는지, 안 했는지 여부 꼼꼼히 확인하기 

### 학습 
1. 백엔드 개발자분과 대화하면서 WAS 개념에 대해 새로 배웠다. WAS와 웹 서버 구분 잘 하기!! 
2. 비즈니스 매너 중 이메일 작성법에 대해 배웠다. 
3. 깃헙 가이드북을 작성하면서 스터디 리포지토리 만드는 방법에 대해 찾아보고 고민할 수 있었다. 리포지토리 간 PR 요청도 먼저 해보니깐 이제 익숙해졌다!
`;

  const mocktags = ["WAS", "Github", "가이드북", "비즈니스 매너"];

  return (
    <Root>
      <div
        style={{ width: "100%", display: "flex", flexDirection: "row-reverse" }}
      >
        <UndoXButton />
      </div>
      <Heading3>오늘의 도약을 기록해 주세요.</Heading3>
      <Heading2>오늘의 감정</Heading2>
      <Emotions />
      <FlexWrapper>
        <Heading2 style={{ marginBottom: "8px" }}>오늘의 도약 기록</Heading2>
        <EditButton />
      </FlexWrapper>
      <Link href="/writing-page">
        <TextEntryButton>
          <ReactMarkdown>{textmock}</ReactMarkdown>
        </TextEntryButton>
      </Link>
      {/*TODO : Writing Page로 들어가기 전에 감정 선택 안 되어 있으면 경고 팝업 띄우기*/}
      {/*TODO : Emotions.tsx에서 마지막으로 선택한 감정을 받아서 server로 전송하는 로직 구현*/}

      <ImageUpload />
      <FlexWrapper>
        <Heading2 style={{ marginTop: "5px", marginBottom: "5px" }}>
          오늘의 도약 태그
        </Heading2>
        <Tooltip
          message="하루도약의 AI가 작성된 성장 기록을 보고 도약태그 3~5개를 출력합니다. 출력된 결과가 마음에 안 드신다면 (reload) 버튼을 눌러 태그 분석 결과를 다시 받아보세요. 태그 분석은 2회까지 다시 요청할 수 있어요."
          direction="top"
        >
          <Image src={iconTooltip} alt="Tip" onClick={handleTooltip} />
        </Tooltip>
      </FlexWrapper>
      <FlexWrapper>
        <Tags tagslist={mocktags}></Tags>
        <Image src={iconReload} alt="Reload" style={{transform: 'translateY(-25px)'}}/>
      </FlexWrapper>
      {/*<SubmitButton>도약기록 남기기</SubmitButton>*/}
    </Root>
  );
};

export default GrowUpRecordHome;

// styled-component
const Heading3 = styled.h3`
  font-size: 1.44rem;
  color: var(--main-green);
`;

const Heading2 = styled.h2`
  font-size: 1.56rem;
  color: var(--sub-green2);
  margin-bottom: 12px;
  margin-top: 30px;
`;

const FlexWrapper = styled.div`
  display: flex;
  gap: 17px;
  align-items: center;
`;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { usePostDataContext } from "@/src/context/PostDataContext";

import Root from "../../style/Root";
import UndoXButton from "../../components/buttons/UndoXButton";
import ImageUploadSection from "../../components/grow-up-record/UploadImage/UploadSection";
import Tags from "../../components/common/Tags";
import Tooltip from "../../components/common/Tooltip";
import iconTooltip from "../../../public/assets/common/icon_tooltip.svg";
import iconX from "../../../public/assets/common/icon_X.svg";
import { useTodayLog } from "@/src/hooks/useTodayLog";
import TitleModal2 from "@/src/components/growcheck/TitleModal2";

import {
  DoneModal,
  EditButton,
  Emotions,
  SubmitButton,
  TextEntryButton,
  ReloadButton,
} from "../../components/grow-up-record";

const GrowUpRecordHome: React.FC = () => {
  const { text, image, emotion, tags, updateImage, updateEmotion, updateTags } =
    usePostDataContext();

  const hasTodayLog = useTodayLog();

  const [isTooltipOpened, setIsTooltipOpened] = useState<boolean>(false);
  const [showDoneModal, setShowDoneModal] = useState(false);
  const [showBackModal, setShowBackModal] = useState(false);

  const isReadyToSubmit = text && emotion && tags && tags.length > 0;

  const handleTooltip = (): void => {
    return isTooltipOpened
      ? setIsTooltipOpened(false)
      : setIsTooltipOpened(true);
  };

  useEffect(() => {
    if (hasTodayLog()) {
      setShowBackModal(true);
    }
  }, [hasTodayLog]);

  return (
    <Root>
      <div
        style={{ width: "100%", display: "flex", flexDirection: "row-reverse" }}
      >
        <UndoXButton icon={iconX} path="/grow-check" />
      </div>
      <Heading3>오늘의 도약을 기록해 주세요.</Heading3>

      <Heading2>오늘의 감정</Heading2>
      <Emotions emotion={emotion} updateEmotion={updateEmotion} />

      <FlexWrapper>
        <Heading2 style={{ marginBottom: "8px" }}>오늘의 도약 기록</Heading2>
        {text ? <EditButton /> : <></>}
      </FlexWrapper>
      <Link href="/writing-page">
        <TextEntryButton>
          <ReactMarkdown>
            {text || "이 곳을 눌러 도약기록을 작성해 주세요."}
          </ReactMarkdown>
        </TextEntryButton>
      </Link>
      <ImageUploadSection image={image} updateImage={updateImage} />

      <FlexWrapper>
        <Heading2 style={{ marginTop: "7px", marginBottom: "5px" }}>
          오늘의 도약 태그
        </Heading2>
        <Tooltip
          message="하루도약의 AI가 작성된 성장 기록을 보고 도약태그 3~7개를 출력해요. 출력된 결과가 마음에 안 드신다면 (reload) 버튼을 눌러 태그 분석 결과를 다시 받아보세요. 태그 분석은 2회까지 다시 요청할 수 있어요."
          direction="top"
        >
          <Image src={iconTooltip} alt="Tip" onClick={handleTooltip} />
        </Tooltip>
      </FlexWrapper>
      <FlexWrapper>
        {tags && tags.length > 0 ? (
          <Tags tagslist={tags} />
        ) : (
          <P>아직 출력된 태그가 없습니다.</P>
        )}
        <ReloadButton text={text} updateTags={updateTags} />
      </FlexWrapper>
      {isReadyToSubmit && (
        <SubmitButton
          text={text}
          image={image}
          emotion={emotion}
          tags={tags}
          onSuccess={() => setShowDoneModal(true)}
        />
      )}
      {showDoneModal && <DoneModal />}
      {showBackModal && (
        <TitleModal2
          onClose={() => setShowBackModal(false)}
          shouldGoBack={true}
        />
      )}
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

const P = styled.p`
  color: var(--gray-from-grayscale);
  margin: 0;
`;

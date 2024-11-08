import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { usePostDataContext } from "@/src/context/PostDataContext";

import Root from "../../style/Root";
import UndoXButton from "../../components/buttons/UndoXButton";
import Emotions from "../../components/grow-up-record/Emotions";
import TextEntryButton from "../../components/grow-up-record/TextEntryButton";
import ImageUploadSection from "../../components/grow-up-record/UploadImage/UploadSection";
import EditButton from "../../components/grow-up-record/EditButton";
import Tags from "../../components/common/Tags";
import Tooltip from "../../components/common/Tooltip";
import iconTooltip from "../../../public/assets/common/icon_tooltip.svg";
import iconReload from "../../../public/assets/common/icon_reload.svg";
import iconX from "../../../public/assets/common/icon_X.svg";
import SubmitButton from "../../components/grow-up-record/SubmitButton";
//import DoneModal from '../../components/grow-up-record/DoneModal';

const GrowUpRecordHome: React.FC = () => {
  const { text, image, emotion, tags, updateEmotion, updateTags } =
    usePostDataContext();
  // TODO: 도약기록 페이지 들어올 때마다 tags를 초기화하는 state 변수

  const [isTooltipOpened, setIsTooltipOpened] = useState<boolean>(false);

  const handleTooltip = (): void => {
    return isTooltipOpened
      ? setIsTooltipOpened(false)
      : setIsTooltipOpened(true);
  };

  const [showModal, setShowModal] = useState(false);
  const clickModal = () => setShowModal(!showModal);

  return (
    <Root>
      <div
        style={{ width: "100%", display: "flex", flexDirection: "row-reverse" }}
      >
        <UndoXButton icon={iconX} />
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
            {text || "이곳을 눌러 도약기록을 작성해 주세요."}
          </ReactMarkdown>
        </TextEntryButton>
      </Link>
      {/*TODO : Writing Page로 들어가기 전에 감정 선택 안 되어 있으면 경고 팝업 띄우기*/}
      {/*TODO : Emotions.tsx에서 마지막으로 선택한 감정을 받아서 server로 전송하는 로직 구현*/}

      <ImageUploadSection />

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
        {tags && tags.length > 0 ? (
          <Tags tagslist={tags} />
        ) : (
          <P>아직 출력된 태그가 없습니다.</P>
        )}
        <Image src={iconReload} alt="Reload" />
      </FlexWrapper>
      <SubmitButton text={text} image={image} emotion={emotion} tags={tags} />
      {/*{showModal && <DoneModal clickModal={clickModal}/>}*/}
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

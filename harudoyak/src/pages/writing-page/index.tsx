import React, { useState, useRef } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { usePostDataContext } from "@/src/context/PostDataContext";
import TextCenterHeader from "../../components/common/Header/CenterTextHeader";
import { TitleModal } from "@/src/components/grow-up-record";

const WritingPage: React.FC = () => {
  const { text, updateText } = usePostDataContext();

  const infoMarkdown = `도약기록에 다음과 같은 것들을 적어보세요. \n
- **성취**: '오늘의 나는 무엇을 잘했는지'  
- **개선**: '오늘의 나는 어떤 문제를 겪었는지, 앞으로 어떻게 해결할 것인지'  
- **학습**: '오늘의 일에서 나는 어떤 것을 배웠는지'   \n
위 세 가지가 오늘도 한 단계 도약한 나 자신을 발견하도록 이끌어 줄 거예요 :)
`;

  const [showModal, setShowModal] = useState(false);
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    updateText(newText);

    if (textRef.current) {
      textRef.current.style.height = `auto`;
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  };

  return (
    <>
      <TextCenterHeader text={text} onFail={() => setShowModal(true)} />
      <Wrapper>
        <Textarea
          value={text}
          placeholder="오늘의 도약기록을 작성해 주세요."
          ref={textRef}
          onChange={changeHandler}
        />
        <Info>
          <ReactMarkdown>{infoMarkdown}</ReactMarkdown>
        </Info>
      </Wrapper>
      {showModal && <TitleModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default WritingPage;

// styled-component
const Wrapper = styled.div`
  margin: 0 23px;
`;

const Textarea = styled.textarea`
  all: unset;
  white-space: pre-line;
  width: 100%;
  background: var(--background);
  border: none;
  color: var(--gray-for-grayscale);
`;

const Info = styled.div`
  color: #a6a6a6;
  bottom: 100px;
  font-size: 12px;
  margin-top: 190px;
  line-height: 1.4;

  p {
    margin: 0;
  }
  ul {
    padding-left: 15px;
    margin-top: 1px;
    margin-bottom: 1px;
    list-style-type: disc;
  }
`;

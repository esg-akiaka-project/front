import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import TextCenterHeader from "../../components/common/Header/CenterTextHeader";

//import { useForm } from "react-hook-form";
//import Link from "next/link";

const WritingPage: React.FC = () => {
  
  const markdown = `도약기록에 다음과 같은 것들을 적어보세요. \n
- **성취**: '오늘의 나는 무엇을 잘했는지'  
- **개선**: '오늘의 나는 어떤 문제를 겪었는지, 앞으로 어떻게 해결할 것인지'  
- **학습**: '오늘의 일에서 나는 어떤 것을 배웠는지'   \n
위 세 가지가 오늘도 한 단계 도약한 나 자신을 발견하도록 이끌어 줄 거예요 :)
`;

  return (
    <>
      <TextCenterHeader />
      <Wrapper>
        <Input
          type="text"
          placeholder="오늘의 도약기록을 작성해 주세요."
        ></Input>

        <Info>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </Info>
      </Wrapper>
    </>
  );
};

export default WritingPage;

// styled-component
const Wrapper = styled.div`
  margin: 0 23px;
`;

const Input = styled.input`
  all: unset;
  white-space: pre-line;
  width: 100%;
  background: var(--background);
  border: none;
  color: var(--gray-for-grayscale);
`;

const Info = styled.div`
  color: #a6a6a6;
  position: sticky;
  bottom: 100px;
  font-size: 12px;
  margin-top: 70px;

  line-height: 1.4;

  p {
    margin: 0; /* 문단 사이의 기본 마진 제거 */
  }
  ul {
    padding-left: 15px;
    margin-top: 1px;
    margin-bottom: 1px;
    list-style-type: disc;
  }
`;

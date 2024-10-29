import React from "react";
import styled from "styled-components";

interface TextEntryButtonProps {
  children: React.ReactNode;
}

const TextEntryButton: React.FC<TextEntryButtonProps> = ({ children }) => {
  return (
    <Root>
      <EntryButton>
        <Span>이 곳을 눌러 도약기록을 작성해 주세요.{children}</Span>
        {/*TODO : 도약 기록 작성 후에는 disabled로 바꿔서 수정 버튼을 통해 접근할 수 있도록 구현*/}
      </EntryButton>
    </Root>
  );
};

export default TextEntryButton;

const Root = styled.div`
  margin-right: 23px;
`;

const EntryButton = styled.button`
  background: #ffffff;
  width: 100%;
  min-height: 100px;
  border-radius: 10px;
  border: 0.05px solid #b5d6bf;
  padding: 0 10px; 
  color: var(--gray-from-grayscale);
  font-size: 0.94rem;
  display: flex;
  align-items: flex-start;
  margin-right: 23px;
`;

const Span = styled.span`
  display: block;
  margin-top: 10px;
`;

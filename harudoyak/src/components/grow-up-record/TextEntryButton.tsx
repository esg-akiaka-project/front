import React from "react";
import styled from "styled-components";

const TextEntryButton: React.FC = () => {
  return (
    <Root>
      <EntryButton>
        <Span>이 곳을 눌러 도약기록을 작성해 주세요.</Span>
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

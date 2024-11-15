import React from "react";
import styled from "styled-components";

interface TextEntryButtonProps {
  children: React.ReactNode;
}

const TextEntryButton: React.FC<TextEntryButtonProps> = ({ children }) => {
  return (
    <Root>
      <EntryButton>
        {children}
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
  padding: 0 12px;
  color: var(--gray-from-grayscale);
  font-size: 0.94rem;
  align-items: flex-start;
  margin-right: 23px;
  margin-bottom: 23px;
`;

const Span = styled.span`
  display: block;
  margin-top: 10px;
`;

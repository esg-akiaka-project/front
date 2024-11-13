import React from 'react';
import styled from 'styled-components';

const MAX_CONTENT_LENGTH = 60; // 최대 글자 수

// 글자 수가 초과되면 ...을 붙여서 잘라내는 함수
const truncatedContent = (content: string) => {
  return content.length > MAX_CONTENT_LENGTH
    ? content.substring(0, MAX_CONTENT_LENGTH) + "..."
    : content;
};

const Content = styled.div`
  font-size: 15px;
  line-height: 1.4;
  font-weight: 700;
  margin: 10px 0;
  color: #333;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;
  align-items: center;
`;

const AlarmContent: React.FC<{ content: string }> = ({ content }) => {
  return <Content>{truncatedContent(content)}</Content>;
};

export default AlarmContent;
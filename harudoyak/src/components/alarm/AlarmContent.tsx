import React from "react";
import styled from "styled-components";

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
  margin: 3px 20px 0px 0px;
  padding: 10px 20px;
  color: #333;
  width: 100%;
  height: 40px;
  display: -webkit-box;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;
  align-items: center;
`;

const AlarmContent: React.FC<{ content: string }> = ({ content }) => {
  if (!content) {
    return <Content></Content>; // 데이터가 없을 때는 빈 컨텐츠 표시
  }
  return <Content>{truncatedContent(content)}</Content>;
};

export default AlarmContent;

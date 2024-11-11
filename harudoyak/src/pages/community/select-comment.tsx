// src/pages/community/select-comment.tsx
import React from "react";
import styled from "styled-components";
import { Header } from "../../components/community/Header";
import { CancelBar } from "../../components/community/CancelBar";
import { MainPhoto } from "../../components/community/MainPhoto";
import { CommentInput } from "../../components/community/CommentInput";
import { ExampleTextBox } from "../../components/community/ExampleTextBox";
import ShareButton from "../../components/community/ShareButton";
import Root from "../../style/Root";
import useCommunityStore from "../../store/useCommunityStore";

const SelectCommentPage: React.FC = () => {
  const { selectedPhoto, comment, setComment } = useCommunityStore();

  const handleShare = () => {
    console.log("test");
    alert("게시글이 저장되었습니다!");
  };

  return (
    <Root>
      <Header />
      <Heading1></Heading1>
      <CancelBar />
      <MainPhoto selectedPhoto={selectedPhoto} />
      <CommentInput comment={comment} setComment={setComment} />
      <ExampleTextBox />
      <ShareButton /> {/* onClick 속성 추가 */}
    </Root>
  );
};

export default SelectCommentPage;

const Heading1 = styled.h1`
  font-size: 1.44rem;
  color: var(--main-green);
  margin-bottom: 10px;
`;

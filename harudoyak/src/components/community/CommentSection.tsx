import React from "react";
import styled from "styled-components";
import WriteCommentBox from "./WriteCommentBox";
import WrittenCommentBox from "./WrittenCommentBox";
import CancelCommentBar from "./CancelCommentBar";
import useCommunityStore from "../../store/useCommunityStore";

interface CommentSectionProps {
  onClose: () => void; // 닫기 함수 prop
  postIndex: number; // 게시물 인덱스 추가
}

const CommentSection: React.FC<CommentSectionProps> = ({
  onClose,
  postIndex,
}) => {
  const { posts } = useCommunityStore();
  const comments = posts[postIndex]?.comments || []; // 해당 게시물의 comments 접근

  return (
    <CommentSectionContainer>
      <h2>댓글</h2>
      <CancelCommentBar onClose={onClose} /> {/* onClose 전달 */}
      <CommentList>
        {comments.map((comment, index) => (
          <WrittenCommentBox key={index} content={comment} />
        ))}
      </CommentList>
      <WriteCommentBox />
    </CommentSectionContainer>
  );
};

export default CommentSection;

const CommentSectionContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60vh;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  z-index: 1000;
`;

const CommentList = styled.div`
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
`;

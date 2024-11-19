import React from "react";
import styled from "styled-components";
import WriteCommentBox from "./WriteCommentBox";
import CancelCommentBar from "./CancelCommentBar";

interface CommentProps {
  commentShareDoyakId: number;
  commentId: number;
  commentContent: string;
  commentAuthorNickname: string;
}

interface CommentSectionProps {
  onClose: () => void; // 닫기 함수 prop
  comments: CommentProps[];
  shareDoyakId: number; // 추가
  onCommentSubmitted: (newComment: CommentProps) => void; // 추가
}

const CommentSection: React.FC<CommentSectionProps> = ({
  onClose,
  comments,
  shareDoyakId,
  onCommentSubmitted,
}) => {
  return (
    <CommentSectionContainer>
      <h2>댓글</h2>
      <CancelCommentBar onClose={onClose} /> {/* onClose 전달 */}
      <CommentList>
        {comments.map((comment) => (
          <CommentBox key={comment.commentId}>
            <CommentAuthor>{comment.commentAuthorNickname}</CommentAuthor>
            <CommentContent>{comment.commentContent}</CommentContent>
          </CommentBox>
        ))}
      </CommentList>
      <WriteCommentBox
        shareDoyakId={shareDoyakId}
        onCommentSubmitted={onCommentSubmitted}
      />
    </CommentSectionContainer>
  );
};

export default CommentSection;

const CommentBox = styled.div`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const CommentContent = styled.div`
  font-size: 14px;
`;

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

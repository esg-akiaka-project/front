import React, { useState } from "react";
import styled from "styled-components";
import WriteCommentBox from "./WriteCommentBox";
import CancelCommentBar from "./CancelCommentBar";

export interface CommentProps { // export 추가
  commentShareDoyakId: number;
  commentId: number;
  commentContent: string;
  commentAuthorNickname: string;
  replies?: ReplyProps[];
}

interface ReplyProps {
  commentshareDoyakId: number;
  replyId: number;
  replyContent: string;
  replyAuthorNickname: string;
  parentCommentId: number;
}

interface CommentSectionProps {
  onClose: () => void;
  comments: CommentProps[];
  shareDoyakId: number;
  onCommentSubmitted: (updatedComments: CommentProps[]) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  onClose,
  comments,
  shareDoyakId,
  onCommentSubmitted,
}) => {
  const [replyTo, setReplyTo] = useState<number | null>(null);

  return (
    <CommentSectionContainer>
      <CommentHeader>댓글</CommentHeader>
      <CancelCommentBar onClose={onClose} />
      <CommentList>
        {comments.length === 0 ? (
          <NoCommentsMessage>댓글이 없습니다.</NoCommentsMessage>
        ) : (
          comments.map((comment) => (
            <CommentBox key={comment.commentId}>
              <CommentAuthor>{comment.commentAuthorNickname}</CommentAuthor>
              <CommentContent>{comment.commentContent}</CommentContent>
              <ReplyButton onClick={() => setReplyTo(comment.commentId)}>
                답글달기
              </ReplyButton>
              {comment.replies?.map((reply) => (
                <ReplyBox key={reply.replyId}>
                  <ReplyAuthor>{reply.replyAuthorNickname}</ReplyAuthor>
                  <ReplyContent>{reply.replyContent}</ReplyContent>
                </ReplyBox>
              ))}
            </CommentBox>
          ))
        )}
      </CommentList>
      <WriteCommentBox
        shareDoyakId={shareDoyakId}
        parentCommentId={replyTo || undefined}
        onCommentSubmitted={(updatedComments) => {
          onCommentSubmitted(updatedComments); // 상태 업데이트
          setReplyTo(null); // 답글 작성 완료 후 초기화
        }}
      />
    </CommentSectionContainer>
  );
};

export default CommentSection;

const CommentHeader = styled.h2`
  text-align: center;
  margin: 0;
  padding: 10px 0;
`;

const CommentBox = styled.div`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const CommentContent = styled.div`
  font-size: 13px;
  color: var(--darkgray-from-grayscale);
`;

const ReplyButton = styled.button`
  margin-top: 5px;
  background-color: transparent;
  border: none;
  color: var(--sub-green3);
  cursor: pointer;
  font-size: 12px;
`;

const ReplyBox = styled.div`
  margin-left: 20px;
  border-top: 1px dashed #e0e0e0;
`;

const ReplyAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  &::before {
  content: "ㄴ"}
`;

const ReplyContent = styled.div`
  font-size: 12px;
  color: var(--darkgray-from-grayscale);
`;

const NoCommentsMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 14px;
  color: var(--darkgray-from-grayscale);
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

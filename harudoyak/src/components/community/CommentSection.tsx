import React, { useState } from "react";
import styled from "styled-components";
import WriteCommentBox from "./WriteCommentBox";
import CancelCommentBar from "./CancelCommentBar";

export interface CommentProps {
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
  const [openedReplies, setOpenedReplies] = useState<{ [key: number]: boolean }>(
    {}
  );

  const toggleReplies = (commentId: number) => {
    setOpenedReplies((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

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
              <ButtonsContainer>
                <ReplyButton onClick={() => setReplyTo(comment.commentId)}>
                  답글달기
                </ReplyButton>
                {comment.replies && comment.replies.length > 0 && (
                  <ToggleRepliesButton
                    onClick={() => toggleReplies(comment.commentId)}
                  >
                    {openedReplies[comment.commentId]
                      ? `답글 닫기`
                      : `${comment.replies.length}개의 답글 열기`}
                  </ToggleRepliesButton>
                )}
              </ButtonsContainer>
              {openedReplies[comment.commentId] &&
                comment.replies?.map((reply) => (
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
          onCommentSubmitted(updatedComments);
          setReplyTo(null);
        }}
      />
    </CommentSectionContainer>
  );
};

export default CommentSection;

// 스타일 추가
const CommentHeader = styled.h2`
  text-align: center;
  margin: 0;
  padding: 10px 0;
`;

const CommentBox = styled.div`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  position: relative; /* 상대적 위치 설정 */
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const CommentContent = styled.div`
  font-size: 13px;
  color: var(--darkgray-from-grayscale);
`;

const ButtonsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between; /* 버튼을 양쪽 끝으로 배치 */
  gap: 10px;
`;

const ReplyButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--sub-green3);
  cursor: pointer;
  font-size: 12px;
  align-self: flex-start; /* 왼쪽 정렬 */
`;

const ToggleRepliesButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--sub-green3);
  cursor: pointer;
  font-size: 12px;
  align-self: flex-end; /* 오른쪽 정렬 */
`;

const ReplyBox = styled.div`
  margin-left: 20px;
  border-top: 1px dashed #e0e0e0;
`;

const ReplyAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  &::before {
    content: "ㄴ";
  }
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

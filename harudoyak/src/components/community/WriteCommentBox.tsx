import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { createComment, createCommentchild, fetchComments } from "@/src/apis/seoroApi";
import { useUserStore } from "@/src/store/useUserStore";

interface CommentProps {
  commentShareDoyakId: number;
  commentId: number;
  commentContent: string;
  commentAuthorNickname: string;
}

interface WriteCommentBoxProps {
  shareDoyakId: number;
  parentCommentId?: number; // 답글 대상 댓글 ID
  onCommentSubmitted: (updatedComments: CommentProps[]) => void; // 댓글 상태 갱신 함수
}

const WriteCommentBox: React.FC<WriteCommentBoxProps> = ({
  shareDoyakId,
  parentCommentId,
  onCommentSubmitted,
}) => {
  const [comment, setComment] = useState("");
  const { memberId } = useUserStore();

  const handleSubmit = async () => {
    if (comment.trim()) {
      try {
        if (parentCommentId) {
          // 답글 작성
          await createCommentchild(shareDoyakId, parentCommentId, comment); // parentCommentId와 comment 전달
        } else {
          // 일반 댓글 작성
          await createComment(shareDoyakId, comment);
        }
        const updatedComments = await fetchComments(shareDoyakId); // 최신 댓글/답글 가져오기
        onCommentSubmitted(updatedComments); // 부모 컴포넌트에 업데이트된 댓글 전달
        setComment(""); // 입력 필드 초기화
      } catch (error) {
        console.error("댓글 작성 중 오류 발생:", error);
      }
    }
  };

  return (
    <CommentInputContainer>
      <CommentInput
        placeholder={
          parentCommentId ? "답글을 작성해주세요..." : "이곳을 눌러 댓글을 작성하세요..."
        }
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <IconWrapper>
        <SubmitIcon onClick={handleSubmit}>
          <Image
            src="/assets/community/sharebutton.svg"
            alt="Submit Icon"
            width={20}
            height={20}
            onLoad={() => console.log("이미지 업로드 성공")}
            onError={() => console.error("이미지 업로드 실패")}
          />
        </SubmitIcon>
      </IconWrapper>
    </CommentInputContainer>
  );
};

export default WriteCommentBox;


const CommentInputContainer = styled.div`
  position: sticky;
  bottom: 0;
  background-color: #ffffff;
  padding: 10px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 8px;
`;

const IconWrapper = styled.div`
  z-index: 1;
  width: 20px;
  height: 20px;
`;

const SubmitIcon = styled.div`
  background-color: var(--sub-green3);
  width: 20px;
  height: 20px;
  border-radius: 24px;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

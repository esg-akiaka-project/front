import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { createComment } from "@/src/apis/seoroApi";

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
  flex: 1; /* 입력창이 가능한 공간을 차지하도록 설정 */
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 8px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SubmitIcon = styled.div`
  cursor: pointer;
  z-index: 1; /* 아이콘이 앞으로 나오도록 설정 */
`;

interface WriteCommentBoxProps {
  onSubmit: (commentContent: string) => void; // onSubmit prop 추가
}

const WriteCommentBox: React.FC<WriteCommentBoxProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim() !== '') {
      onSubmit(comment); // 댓글 작성 핸들러 호출
      setComment(''); // 입력 필드 초기화
    }
  };

  return (
    <CommentInputContainer>
      <CommentInput
        placeholder="댓글을 작성하세요..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <IconWrapper>
        <SubmitIcon onClick={handleSubmit}>
          <Image
            src="/assets/community/sharebutton.svg"
            alt="Submit Icon"
            width={24}
            height={24}
          />
        </SubmitIcon>
      </IconWrapper>
    </CommentInputContainer>
  );
};

export default WriteCommentBox;

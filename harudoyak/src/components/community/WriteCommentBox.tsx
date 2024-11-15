import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { createComment, fetchComments } from "@/src/apis/seoroApi";

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
    z-index: 1; /* 아이콘이 앞으로 나오도록 설정 */
    width: 20px;
    height: 20px;
`;

const SubmitIcon = styled.div`
 background-color: var(--sub-green3); 
 width: 20px; 
 height: 20px; 
 border-radius: 24px;
 cursor: pointer; 
 z-index: 2; /* 아이콘이 앞으로 나오도록 설정 */
 display: flex; 
 align-items: center; 
 justify-content: center;
  
`;

interface WriteCommentBoxProps {
  shareDoyakId: number; // 추가
  onCommentSubmitted: (newComment: string) => void; // 추가
}

const WriteCommentBox: React.FC<WriteCommentBoxProps> = ({ shareDoyakId, onCommentSubmitted }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (comment.trim()) {
      try {
        await createComment(shareDoyakId, comment);
        const updatedComments = await fetchComments(shareDoyakId); // 
        onCommentSubmitted(updatedComments); // 새로운 댓글을 부모 컴포넌트에 전달
        setComment(''); // 입력 필드 초기화
      } catch (error) {
        console.error("댓글 작성 중 오류 발생:", error);
      }
    }
  };

  return (
    <CommentInputContainer>
      <CommentInput
        placeholder="이곳을 눌러 댓글을 작성하세요..."
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
            onLoad={()=> console.log('이미지 업로드 성공')}
            onError={() => console.error('이미지 업로드 실패')}
          />
          </SubmitIcon>
      </IconWrapper>
    </CommentInputContainer>
  );
};

export default WriteCommentBox;

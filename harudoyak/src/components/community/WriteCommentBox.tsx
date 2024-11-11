import React, { useState } from "react";
import styled from "styled-components";
import useCommunityStore from "../../store/useCommunityStore";
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

interface ShareProps {
  shareId: number;
}
const WriteCommentBox: React.FC<ShareProps> = ({ shareId }) => {
  const [comment, setComment] = useState("");
  const { incrementCommentCount } = useCommunityStore();

  const handleSubmit = async () => {
    try {
      const data = await createComment(shareId, comment);
    } catch (error) {
      console.log(error);
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

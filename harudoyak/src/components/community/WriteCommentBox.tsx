import React, { useState } from 'react';
import styled from 'styled-components';
import useCommunityStore from '../../store/useCommunityStore';
import Image from 'next/image';

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
  width: 100%;
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
`;

const WriteCommentBox: React.FC = () => {
  const [comment, setComment] = useState('');
  const { incrementCommentCount } = useCommunityStore();

  const handleSubmit = () => {
    if (comment.trim() !== '') {
      incrementCommentCount();
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
          <Image src="/assets/community/sharebutton.svg" alt="Submit Icon" width={24} height={24} />
        </SubmitIcon>
      </IconWrapper>
    </CommentInputContainer>
  );
};

export default WriteCommentBox;

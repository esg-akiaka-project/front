import React from 'react';
import styled from 'styled-components';

const CommentInputContainer = styled.div`
  position: sticky;
  bottom: 0;
  background-color: #ffffff;
  padding: 10px;
  border-top: 1px solid #e0e0e0;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const WriteCommentBox: React.FC = () => {
  return (
    <CommentInputContainer>
      <CommentInput placeholder="댓글을 작성하세요..." />
    </CommentInputContainer>
  );
};

export default WriteCommentBox;

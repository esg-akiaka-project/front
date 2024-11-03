import React from 'react';
import styled from 'styled-components';

const CommentHeaderContainer = styled.div`
  padding: 10px;
  background-color: #f8f8f8;
  font-weight: bold;
`;

const CommentHeader: React.FC = () => {
  return <CommentHeaderContainer>댓글</CommentHeaderContainer>;
};

export default CommentHeader;

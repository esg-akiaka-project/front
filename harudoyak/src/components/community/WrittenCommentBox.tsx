import React from 'react';
import styled from 'styled-components';

const CommentContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
`;

interface CommentProps {
  content: string;
}

const WrittenCommentBox: React.FC<CommentProps> = ({ content }) => {
  return <CommentContainer>{content}</CommentContainer>;
};

export default WrittenCommentBox;

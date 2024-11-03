// src/components/community/CommentSection.tsx
import React from 'react';
import styled from 'styled-components';
import WriteCommentBox from './WriteCommentBox';
import WrittenCommentBox from './WrittenCommentBox';
import CancelCommentBar from './CancelCommentBar';

interface CommentSectionProps {
  onClose: () => void; // 닫기 함수 prop
}

const CommentSection: React.FC<CommentSectionProps> = ({ onClose }) => {
  return (
    <CommentSectionContainer>
      <h2>댓글</h2>
      <CancelCommentBar onClose={onClose} /> {/* onClose 전달 */}
      <CommentList>
        <WrittenCommentBox content="첫 번째 댓글" />
        <WrittenCommentBox content="두 번째 댓글" />
        {/* 추가 댓글 */}
      </CommentList>
      <WriteCommentBox />
    </CommentSectionContainer>
  );
};

export default CommentSection;

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

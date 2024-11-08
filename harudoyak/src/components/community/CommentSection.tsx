import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import WriteCommentBox from './WriteCommentBox';
import WrittenCommentBox from './WrittenCommentBox';
import CancelCommentBar from './CancelCommentBar';
import { createComment, fetchComments } from '../../apis/seoroApi'; // API 함수 임포트

interface CommentSectionProps {
  onClose: () => void; // 닫기 함수 prop
  postId: number;      // 게시물 ID 추가
}

const CommentSection: React.FC<CommentSectionProps> = ({ onClose, postId }) => {
  const [comments, setComments] = useState<string[]>([]);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchComments(postId);
        setComments(data);
      } catch (error) {
        console.error('댓글을 불러오는 중 오류 발생:', error);
      }
    };

    loadComments();
  }, [postId]);

  const handleCommentSubmit = async (commentContent: string) => {
    try {
      const newComment = await createComment(postId, commentContent);
      setComments([...comments, newComment]);
    } catch (error) {
      console.error('댓글 작성 중 오류 발생:', error);
    }
  };

  return (
    <CommentSectionContainer>
      <h2>댓글</h2>
      <CancelCommentBar onClose={onClose} /> {/* onClose 전달 */}
      <CommentList>
        {comments.map((comment, index) => (
          <WrittenCommentBox key={index} content={comment} />
        ))}
      </CommentList>
      <WriteCommentBox onSubmit={handleCommentSubmit} /> {/* 댓글 작성 핸들러 전달 */}
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

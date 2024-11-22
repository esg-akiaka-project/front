import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchPosts } from "@/src/apis/seoroApi";

interface EditCommentInputProps {
  shareDoyakId: number;
}

interface Post {
    shareDoyakId: number; 
    shareImageUrl: string; 
    shareContent: string; 
    doyakCount: number; 
    commentCount: number; 
    shareAuthorNickname: string; 
    goalName: string;
}

const InputContainer = styled.div`
  width: 100%;
  height: 130px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 130px;
  padding: 8px;
  font-family: Inter;
  font-size: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
`;

const EditCommentInput: React.FC<EditCommentInputProps> = ({ shareDoyakId }) => {
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    const loadPostContent = async () => {
      try {
        const posts: Post[] = await fetchPosts();
        const targetPost = posts.find(post => post.shareDoyakId === shareDoyakId);
        if (targetPost) {
          setComment(targetPost.shareContent);
        } else {
          console.error("해당 게시글을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    loadPostContent();
  }, [shareDoyakId]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 200) {
      setComment(e.target.value);
    }
  };

  return (
    <InputContainer>
      <TextArea
        value={comment}
        onChange={handleChange}
        placeholder="문구를 작성하세요...(최대 200자 이내)"
        maxLength={200}
      />
    </InputContainer>
  );
};

export default EditCommentInput;

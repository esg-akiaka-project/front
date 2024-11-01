import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import NavigationBar from '@/src/components/common/navigationbar/NavigationBar';
import MainHeader from '../../components/community/MainHeader';
import { MainPhoto } from '../../components/community/MainPhoto';
import { CommentInput } from '../../components/community/CommentInput';
import WriteButton from '../../components/community/WriteButton';
import Root from '../../style/Root';

const CommunityHome: React.FC = () => {
  const [comment, setComment] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]); // 기존 게시글 목록
  const router = useRouter();

  useEffect(() => {
    const { newPost } = router.query;
    if (newPost) {
      const parsedPost = Array.isArray(newPost) ? newPost[0] : newPost;
      setPosts([...posts, JSON.parse(parsedPost)]); // 새로운 게시글 추가
    }
  }, [router.query]);

  return (
    <Root>
      <MainHeader />
      <MainPhoto selectedPhoto={selectedPhoto} />
      <CommentInput comment={comment} setComment={setComment} />
      <WriteButton />
      <NavigationBar />
    </Root>
  );
};

export default CommunityHome;

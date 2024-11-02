// index.tsx (CommunityHome)
import React from 'react';
import styled from 'styled-components';
import NavigationBar from '@/src/components/common/navigationbar/NavigationBar';
import MainHeader from '../../components/community/MainHeader';
import { MainPhoto } from '../../components/community/MainPhoto';
import WriteButton from '../../components/community/WriteButton';
import Root from '../../style/Root';
import useCommunityStore from '../../store/useCommunityStore';

const CommunityHome: React.FC = () => {
    const { posts } = useCommunityStore();

    return (
        <Root>
            <MainHeader />
            <PostList>
                {posts.map((post, index) => (
                    <Post key={index}>
                        <MainPhoto selectedPhoto={post.photo} />
                        <Comment>{post.comment}</Comment>
                    </Post>
                ))}
            </PostList>
            <WriteButton />
            <NavigationBar />
        </Root>
    );
};

export default CommunityHome;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  overflow-y: auto;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
`;

const Comment = styled.p`
  margin-top: 8px;
  font-size: 1rem;
  color: #333;
`;

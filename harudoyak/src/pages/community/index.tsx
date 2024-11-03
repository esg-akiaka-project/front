// src/pages/community/index.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavigationBar from '@/src/components/common/navigationbar/NavigationBar';
import MainHeader from '../../components/community/MainHeader';
import { MainPhoto } from '../../components/community/MainPhoto';
import WriteButton from '../../components/community/WriteButton';
import Root from '../../style/Root';
import useCommunityStore from '../../store/useCommunityStore';
import SideHeader from '@/src/components/community/SideHeader';
import CommentSection from '../../components/community/CommentSection';
import NickName from '../../components/community/NickName';
import DoyakObject from '../../components/community/DoyakObject';

const CommunityHome: React.FC = () => {
    const { posts } = useCommunityStore();
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [showSideHeader, setShowSideHeader] = useState(false);

    const toggleCommentSection = () => {
        setIsCommentOpen(!isCommentOpen);
        document.body.style.overflow = isCommentOpen ? 'auto' : 'hidden'; // 스크롤 방지
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowSideHeader(window.scrollY > 100); // 스크롤이 100 이상일 때 SideHeader 표시
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Root>
            <MainHeader />
            {showSideHeader && <SideHeader />}
            <PostList>
                {posts.map((post, index) => (
                    <React.Fragment key={index}>
                        <Post>
                            <NickName />
                            <DoyakObject />
                            <MainPhoto selectedPhoto={post.photo} />
                            <Comment>{post.comment}</Comment>

                        </Post>
                        {index < posts.length - 1 && <Separator />} {/* 구분선 추가 */}
                    </React.Fragment>
                ))}
            </PostList>
            {isCommentOpen && <CommentSection onClose={toggleCommentSection} />}
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

const CommentButtonStyled = styled.button`
  margin-top: 10px;
  padding: 8px;
  font-size: 0.9rem;
  color: #007aff;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
`;

const Separator = styled.hr`
  border: none;
  border-top: 1px solid green; /* 초록색 구분선 */
  margin: 20px 0;
`;

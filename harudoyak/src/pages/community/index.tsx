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
import CommentButton from '../../components/community/CommentButton';
import Doyak from '../../components/community/Doyak';
import NumberDoyak from '../../components/community/NumberDoyak';
import NumberComment from '../../components/community/NumberComment';

const CommunityHome: React.FC = () => {
    const { posts, isCommentOpen, toggleCommentSection } = useCommunityStore();
    const [showSideHeader, setShowSideHeader] = useState(false);

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
                            <ButtonContainer>
                                <Doyak /> {/* Doyak 추가 */}
                                <NumberDoyak /> {/* NumberDoyak 추가 */}
                                <CommentButton /> {/* CommentButton 위치 변경 */}
                                <NumberComment /> {/* NumberComment 추가 */}
                            </ButtonContainer>
                            <CommentText>{post.comment}</CommentText> {/* CommentText로 변경 */}
                        </Post>
                        {index < posts.length - 1 && <Separator />} {/* 구분선 추가 */}
                    </React.Fragment>
                ))}
            </PostList>
            {isCommentOpen && <CommentSection onClose={toggleCommentSection} />} {/* CommentSection 조건부 렌더링 */}
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

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 버튼 간의 간격 조정 */
`;

const CommentText = styled.p`  /* CommentText 스타일 추가 */
  margin-top: 8px;
  font-size: 1rem;
  color: #333;
`;

const Separator = styled.hr`
  border: none;
  border-top: 1px solid green; /* 초록색 구분선 */
  margin: 20px 0;
`;

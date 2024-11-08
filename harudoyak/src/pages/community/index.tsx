import React, { useState, useEffect, useRef } from 'react';
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

// seoroApi.ts에서 API 함수 임포트
import {
    fetchPosts,
    createPost,
    fetchPostDetail,
    createComment,
    fetchComments
} from '@/src/apis/seoroApi';

const CommunityHome: React.FC = () => {
    const { posts, isCommentOpen, toggleCommentSection } = useCommunityStore();
    const [showSideHeader, setShowSideHeader] = useState(false);
    const postRefs = useRef<(HTMLDivElement | null)[]>([]); // 게시글 참조 배열 생성

    useEffect(() => {
        const handleScroll = () => {
            setShowSideHeader(window.scrollY > 100); // 스크롤이 100 이상일 때 SideHeader 표시
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // 댓글 창이 열리면 body 스크롤 비활성화
        if (isCommentOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isCommentOpen]);

    const handleCommentButtonClick = (index: number) => {
        toggleCommentSection();
        if (postRefs.current[index]) {
            postRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' }); // 해당 게시글로 스크롤
        }
    };

    return (
        <Root>
            <MainHeader />
            {showSideHeader && <SideHeader />}
            <PostList>
                {posts.map((post, index) => (
                    <React.Fragment key={index}>
                        <Post ref={(el) => { postRefs.current[index] = el; }}> {/* 게시글 참조 저장 */}
                            <NickName />
                            <DoyakObject />
                            <MainPhoto selectedPhoto={post.photo} />
                            <ButtonContainer>
                                <Doyak />
                                <NumberDoyak />
                                <CommentButton onClick={() => handleCommentButtonClick(index)} /> {/* 댓글 버튼 클릭 시 스크롤 */}
                                <NumberComment />
                            </ButtonContainer>
                            <CommentText>{post.comment}</CommentText>
                        </Post>
                        {index < posts.length - 1 && <Separator />}
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

// 스타일 정의
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
  gap: 10px;
`;

const CommentText = styled.p`
  margin-top: 8px;
  font-size: 1rem;
  color: #333;
`;

const Separator = styled.hr`
  border: none;
  border-top: 1px solid green;
  margin: 20px 0;
`;

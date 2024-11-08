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
    fetchPosts,        // 게시글 목록을 불러오는 함수
    createPost,        // 게시글 생성 함수
    fetchPostDetail,   // 특정 게시글 세부 정보를 불러오는 함수
    createComment,     // 댓글 생성 함수
    fetchComments      // 댓글 목록을 불러오는 함수
} from '@/src/apis/seoroApi';

const CommunityHome: React.FC = () => {
    // 댓글 섹션의 열림/닫힘 상태와 토글 함수는 전역 상태로 관리
    const { isCommentOpen, toggleCommentSection } = useCommunityStore();
    
    // posts 배열은 API 호출로 데이터를 가져오며, 로컬 상태로 관리
    const [posts, setPosts] = useState([]);
    
    // 스크롤 위치에 따라 SideHeader 표시 여부를 결정하는 상태
    const [showSideHeader, setShowSideHeader] = useState(false);
    
    // 게시글 각각을 참조하기 위한 배열
    const postRefs = useRef<(HTMLDivElement | null)[]>([]);

    // 페이지가 처음 로드될 때 게시글 데이터를 불러옴
    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts(); // API를 통해 게시글 목록을 가져옴
                setPosts(data);                  // 가져온 데이터를 로컬 상태에 설정
            } catch (error) {
                console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
            }
        };
        loadPosts(); // 게시글 목록을 불러오는 함수 호출
    }, []);

    // 스크롤 위치에 따라 SideHeader 표시 여부를 조정
    useEffect(() => {
        const handleScroll = () => {
            setShowSideHeader(window.scrollY > 100); // 스크롤 위치가 100 이상이면 SideHeader를 표시
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // 컴포넌트가 언마운트될 때 이벤트 제거
    }, []);

    // 댓글 섹션 열림/닫힘에 따라 body 스크롤을 제어
    useEffect(() => {
        if (isCommentOpen) {
            document.body.style.overflow = 'hidden'; // 댓글 섹션이 열리면 스크롤 비활성화
        } else {
            document.body.style.overflow = 'auto';   // 댓글 섹션이 닫히면 스크롤 활성화
        }
    }, [isCommentOpen]);

    // 특정 게시글로 스크롤 이동 및 댓글 섹션 열기
    const handleCommentButtonClick = (index: number) => {
        toggleCommentSection(); // 댓글 섹션 열림/닫힘 토글
        if (postRefs.current[index]) {
            postRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' }); // 해당 게시글로 스크롤
        }
    };

    return (
        <Root>
            <MainHeader />
            {showSideHeader && <SideHeader />} {/* 스크롤 위치에 따라 SideHeader 표시 */}
            
            {/* 게시글 목록 */}
            <PostList>
                {posts.map((post, index) => (
                    <React.Fragment key={index}>
                        <Post ref={(el) => { postRefs.current[index] = el; }}> {/* 게시글 각각에 대한 참조 저장 */}
                            <NickName />
                            <DoyakObject />
                            <MainPhoto selectedPhoto={post.photo} />
                            <ButtonContainer>
                                <Doyak />
                                <NumberDoyak />
                                {/* 댓글 버튼 클릭 시 handleCommentButtonClick 함수 호출 */}
                                <CommentButton onClick={() => handleCommentButtonClick(index)} /> 
                                <NumberComment />
                            </ButtonContainer>
                            <CommentText>{post.comment}</CommentText>
                        </Post>
                        {index < posts.length - 1 && <Separator />} {/* 게시글 간의 구분선 */}
                    </React.Fragment>
                ))}
            </PostList>
            
            {/* 댓글 섹션 열림/닫힘 상태에 따라 렌더링 */}
            {isCommentOpen && <CommentSection onClose={toggleCommentSection} />}
            
            <WriteButton /> {/* 게시글 작성 버튼 */}
            <NavigationBar /> {/* 하단 네비게이션 바 */}
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

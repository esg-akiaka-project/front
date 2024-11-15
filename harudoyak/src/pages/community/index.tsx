import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import NavigationBar from "@/src/components/common/navigationbar/NavigationBar";
import MainHeader from "../../components/community/MainHeader";
import { MainPhoto } from "../../components/community/MainPhoto";
import WriteButton from "../../components/community/WriteButton";
import Root from "../../style/Root";
import useCommunityStore from "../../store/useCommunityStore";
import SideHeader from "@/src/components/community/SideHeader";
import CommentSection from "../../components/community/CommentSection";
import NickName from "../../components/community/NickName";
import DoyakObject from "../../components/community/DoyakObject";
import CommentButton from "../../components/community/CommentButton";
import Doyak from "../../components/community/Doyak";
import NumberDoyak from "../../components/community/NumberDoyak";
import NumberComment from "../../components/community/NumberComment";
import Image from "next/image";

// seoroApi.ts에서 API 함수 임포트
import {
  fetchPosts,
  createComment,
  fetchComments,
  addDoyak,
} from "@/src/apis/seoroApi";

import { useUserStore } from "@/src/store/useUserStore";

interface CommentProps {
  commentShareDoyakId: number;
  commentId: number;
  commentContent: string;
  commentAuthorNickname: string;
}
interface PostProps {
  shareDoyakId: number;
  shareImageUrl: string;
  shareContent: string;
  doyakCount: number;
  commentCount: number;
  shareAuthorNickname: string;
  goalName: string;
  resComments: CommentProps[];
}

const CommunityHome: React.FC = () => {
  const { memberId } = useUserStore();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState<number>(0);
  const [comments, setComments] = useState<CommentProps[]>([]); // 댓글 데이터 상태 추가
  const [showSideHeader, setShowSideHeader] = useState<boolean>(false);
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({}); // 좋아요 상태 관리

  const postRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        const formattedData = data.map((post: PostProps) => ({
          shareDoyakId: post.shareDoyakId,
          shareImageUrl: post.shareImageUrl,
          shareContent: post.shareContent,
          doyakCount: post.doyakCount,
          commentCount: post.commentCount,
          shareAuthorNickname: post.shareAuthorNickname,
          goalName: post.goalName,
          resComments: post.resComments,
        }));
        setPosts(formattedData);
      } catch (error) {
        console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    loadPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowSideHeader(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isCommentOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isCommentOpen]);

  // 댓글 열기 및 특정 게시글로 스크롤 이동
  const handleCommentButtonClick = async (
    index: number,
    shareDoyakId: number
  ) => {
    setSelectedPostIndex(index);
    setIsCommentOpen(true);
    try {
      const commentsData = await fetchComments(shareDoyakId);
      setComments(commentsData || []);
    } catch (error) {
      console.error("댓글 데이터를 불러오는 중 오류 발생:", error);
    }

    if (postRefs.current[index]) {
      postRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleDoyakCount = async (index: number, shareDoyakId: number) => {
    if (memberId === null) return;
    const isLiked = likedPosts[shareDoyakId] || false;

    try {
      await addDoyak(memberId, shareDoyakId);
      setPosts((prevPosts) =>
        prevPosts.map((post, i) =>
          i === index
            ? { ...post, doyakCount: post.doyakCount + (isLiked ? -1 : 1) }
            : post
        )
      );
      setLikedPosts((prevLikedPosts) => ({
        ...prevLikedPosts,
        [shareDoyakId]: !isLiked,
      }));
    } catch (error) {
      console.error("좋아요 업데이트 중 오류 발생:", error);
    }
  };

  const closeCommentSection = () => {
    setIsCommentOpen(false);
    setSelectedPostIndex(0);
    setComments([]); // 댓글 섹션을 닫을 때 댓글 상태 초기화
  };

  return (
    <Root>
      <MainHeader />
      {showSideHeader && <SideHeader />}
      <PostList>
        {posts.map((post, index) => (
          <React.Fragment key={post.shareDoyakId}>
            <Post
              ref={(el) => {
                postRefs.current[index] = el;
              }}
            >
              <NickName nickname={post.shareAuthorNickname} />
              <DoyakObject object={post.goalName} />
              <MainPhoto selectedPhoto={post.shareImageUrl} />
              <ButtonContainer>
                <IconWrapper>
                  <Image
                    src="/assets/community/doyak.svg"
                    alt="Doyak Icon"
                    width={25}
                    height={23}
                    onClick={() => handleDoyakCount(index, post.shareDoyakId)}
                  />
                </IconWrapper>
                <NumberDoyak count={post.doyakCount} />
                <CommentButton
                  onClick={() =>
                    handleCommentButtonClick(index, post.shareDoyakId)
                  }
                />
                <NumberComment commentCnt={post.commentCount} />
              </ButtonContainer>
              <CommentText>{post.shareContent}</CommentText>
            </Post>
            {index < posts.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </PostList>

      {isCommentOpen && (
        <CommentSection
          onClose={closeCommentSection}
          comments={comments}
          onSubmitComment={async (commentContent) => {
            try {
              const newComment = await createComment(
                posts[selectedPostIndex].shareDoyakId,
                commentContent
              );
              setComments([...comments, newComment]);
            } catch (error) {
              console.error("댓글 작성 중 오류 발생:", error);
            }
          }}
        />
      )}
      <WriteButton />
    </Root>
  );
};

export default CommunityHome;

const CommentText = styled.div``;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow-y: auto;
  padding-bottom: 6rem;
`;

const Post = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Separator = styled.hr`
  border: none;
  border-top: 1px solid green;
  margin: 20px 0;
`;

const IconWrapper = styled.div`
  width: 25px;
  height: 23px;
  margin-right: 8px;
`;

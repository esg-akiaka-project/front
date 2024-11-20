import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

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
import Modal from "../../components/home/Modal"; //Modal 컴포넌트 임포트
import Image from "next/image";
import {useRouter} from "next/router";
// seoroApi.ts에서 API 함수 임포트
import {
  fetchPosts,
  fetchComments,
  addDoyak,
  deletePost,
  editPost,
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

  const [openModal, setOpenModal] = useState(false); // 모달 상태 관리
  const [selectedPostId, setSelectedPostId] = useState<number |null>(null); // 선택된 게시글 ID
  
  const postRefs = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();
  
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
        // LikedPosts 초기화
        const initialLikedPosts = formattedData.reduce((acc: Record<number,boolean>,post: PostProps) => {
          acc[post.shareDoyakId] = post.doyakCount > 0; // doyakCount가 0보다 크면 true로 설정
          return acc;
        }, {} as Record<number,boolean>);
        setLikedPosts(initialLikedPosts); // LikedPosts 초기화
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
    shareDoyakId: number,
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
      const response = await addDoyak(memberId, shareDoyakId);
      const updatedDoyakCount = response.doyakCount; // 서버에서 반환된 도약수

      setPosts((prevPosts) =>
        prevPosts.map((post, i) =>
          i === index
            ? { ...post, doyakCount: updatedDoyakCount }
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

  const handleCommentSubmitted = (updatedComments: CommentProps[]) => {
    setComments(updatedComments);
    setPosts((prevPosts) =>
      prevPosts.map((post, i) =>
        i === selectedPostIndex
          ? { ...post, commentCount: updatedComments.length }
          : post
      )
    );
  };
  
const handleEdit = async () => {
  if (memberId === null || selectedPostId === null) return;
  try {
    // 수정 페이지로 이동
    router.push({
      pathname: "/community/select-picture",
      query: { postId: selectedPostId },
    });
    setOpenModal(false); // 모달 닫기
  } catch (error) {
    console.error("게시글 수정 이동 중 오류 발생:", error);
  }
};

 // 삭제 버튼 클릭 핸들러 추가
 const handleDeletePost = async (index: number, shareDoyakId: number) => {
  if (memberId === null) {
    console.error("memberId가 없습니다. 로그인을 확인해주세요");
    return;
  }

  const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
  if (!confirmDelete) return;

  try {
    await deletePost(memberId, shareDoyakId);
    setPosts((prevPosts) => prevPosts.filter((_, i) => i !== index));
    console.log("게시글이 삭제되었습니다.");
  } catch (error) {
    console.error("게시글 삭제 중 오류 발생:", error);
  }
  setOpenModal(false); // 모달 닫기
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
      height={25}
      onClick={() => handleDoyakCount(index, post.shareDoyakId)}
    />
  </IconWrapper>
  <NumberDoyak count={post.doyakCount} />
  <CommentButton
    onClick={() => handleCommentButtonClick(index, post.shareDoyakId)}
  />
  <NumberComment commentCnt={post.commentCount} />
  <MoreButton
                  onClick={() => {
                    setSelectedPostId(post.shareDoyakId);
                    setOpenModal(true);
                  }}
                >
                  더보기
                </MoreButton>
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
          shareDoyakId={posts[selectedPostIndex].shareDoyakId}
          onCommentSubmitted={handleCommentSubmitted}
        />
      )}
      <WriteButton />
  {/* 더보기 모달 */}
  {openModal && (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <ModalContent>
            <ModalButton onClick={() => handleEdit()}>수정</ModalButton>
            <ModalButton
              onClick={() =>
                handleDeletePost(
                  selectedPostIndex,
                  selectedPostId as number
                )
              }
            >
              삭제
            </ModalButton>
          </ModalContent>
        </Modal>
      )}
    </Root>
  );
};

export default CommunityHome;

const CommentText = styled.div``;

const MoreButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ModalButton = styled.button`
  background-color: var(--sub-green2);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }
`;

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

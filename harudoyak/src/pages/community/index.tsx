import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MainHeader from "../../components/community/MainHeader";
import { MainPhoto } from "../../components/community/MainPhoto";
import WriteButton from "../../components/community/WriteButton";
//import SideHeader from "@/src/components/community/SideHeader";
import CommentSection from "../../components/community/CommentSection";
import NickName from "../../components/community/NickName";
import DoyakObject from "../../components/community/DoyakObject";
import CommentButton from "../../components/community/CommentButton";
import NumberDoyak from "../../components/community/NumberDoyak";
import NumberComment from "../../components/community/NumberComment";
import Modal from "../../components/community/seoroModal";
import Image from "next/image";
import { useRouter } from "next/router";

// seoroApi.ts에서 API 함수 임포트
import {
  fetchPosts,
  fetchComments,
  addDoyak,
  deletePost,
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
  const { memberId, nickname } = useUserStore();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState<number>(0);
  const [comments, setComments] = useState<CommentProps[]>([]); // 댓글 데이터 상태 추가
  //const [showSideHeader, setShowSideHeader] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedPostIndexForDelete, setSelectedPostIndexForDelete] = useState<
    number | null
  >(null);

  const postRefs = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        const formattedData = data.map((post: PostProps) => ({
          shareDoyakId: post.shareDoyakId,
          shareImageUrl: post.shareImageUrl,
          shareContent: post.shareContent,
          doyakCount: post.doyakCount, // 서버에서 최신 도약수 반영
          commentCount: post.commentCount,
          shareAuthorNickname: post.shareAuthorNickname,
          goalName: post.goalName,
          resComments: post.resComments,
        }));

        setPosts(formattedData);
        console.log("게시글 데이터 성공:", formattedData.doyakCount); // 서버에서 최신 도약수 반영);
        console.log("게시글 데이터 성공:", formattedData); // 서버에서 최신 도약수 반영);
      } catch (error) {
        console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    loadPosts();
  }, [refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger(!refreshTrigger);
  };

  // useEffect(() => {
  //   // const handleScroll = () => {
  //   //   setShowSideHeader(window.scrollY > 100);
  //   // };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  useEffect(() => {
    if (openModal || isDeleteModalOpen || isCommentOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openModal, isDeleteModalOpen, isCommentOpen]);

  useEffect(() => {
    const postId = router.query.postId;
    if (postId) {
      const postIndex = posts.findIndex(
        (post) => post.shareDoyakId === Number(postId)
      );
      if (postIndex !== -1 && postRefs.current[postIndex]) {
        postRefs.current[postIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        handleCommentButtonClick(postIndex, Number(postId));
      }
    }
  }, [router.query.postId, posts]);
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
    if (!memberId) return;

    try {
      const response = await addDoyak(memberId, shareDoyakId);
      const updatedDoyakCount = response.doyakCount; // 서버에서 반환된 도약수

      setPosts((prevPosts) =>
        prevPosts.map((post, i) =>
          i === index ? { ...post, doyakCount: updatedDoyakCount } : post
        )
      );
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

  // 삭제 버튼 클릭 핸들러 추가
  const handleDeletePost = async (
    index: number,
    memberId: number | null,
    shareDoyakId: number
  ) => {
    if (memberId === null) {
      console.error("memberId가 없습니다. 로그인을 확인해주세요");
      return;
    }

    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await deletePost(memberId, shareDoyakId);
      setPosts((prevPosts) =>
        prevPosts.filter((_, i) => i !== selectedPostIndexForDelete)
      );
      console.log("게시글이 삭제되었습니다.");
    } catch (error) {
      console.error("게시글 삭제 중 오류 발생:", error);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <MainHeader onClick={handleRefresh} />
      <PostList>
        <TopMargin />
        {posts.map((post, index) => (
          <React.Fragment key={post.shareDoyakId}>
            <Post
              ref={(el) => {
                postRefs.current[index] = el;
              }}
            >
              <NickName nickname={post.shareAuthorNickname} />
              <DoyakObject object={post.goalName} />
              {nickname === post.shareAuthorNickname && (
                <MoreButton
                  onClick={() => {
                    setSelectedPostId(post.shareDoyakId);
                    setSelectedPostIndexForDelete(index);
                    setOpenModal(true);
                  }}
                >
                  ...
                </MoreButton>
              )}
              <MainPhoto selectedPhoto={post.shareImageUrl} />
              <SmallMargin />
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
                  onClick={() =>
                    handleCommentButtonClick(index, post.shareDoyakId)
                  }
                />
                <NumberComment commentCnt={post.commentCount} />
              </ButtonContainer>
              <SmallMargin style={{ height: "10px" }} />
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

      {openModal && (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <ModalContent>
            <ModalButton
              onClick={() => router.push(`/community/select-picture`)}
            >
              수정
            </ModalButton>
            <ModalButton
              onClick={() => {
                setOpenModal(false);
                setIsDeleteModalOpen(true);
              }}
            >
              삭제
            </ModalButton>
          </ModalContent>
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <ModalContent>
            <ModalTitle>삭제</ModalTitle>
            <ModalButton
              onClick={() =>
                handleDeletePost(
                  selectedPostIndexForDelete!,
                  memberId!,
                  selectedPostId!
                )
              }
            >
              확인
            </ModalButton>
          </ModalContent>
        </Modal>
      )}
      <WriteButton />
    </>
  );
};

export default CommunityHome;

const CommentText = styled.div``;

const MoreButton = styled.button`
  position: absolute; /* 부모(Post) 컨테이너의 상대적 위치에 따라 배치 */
  top: 20px; /* 위쪽에서 10px */
  right: 20px; /* 오른쪽에서 10px */
  background-color: #a6a6a6;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: var(--sub-green1);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

// const ModalText = styled.p`
//   font-size: 16px;
//   color: #333;
// `;

// const DeleteButton = styled.button`
//   background-color: #ff4d4f;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   padding: 5px 10px;
//   cursor: pointer;
//   font-size: 12px;

//   &:hover {
//     background-color: #d9363e;
//   }
// `;

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
  position: relative; /* 자식 요소를 절대 위치로 배치 가능 */
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
`;

const Separator = styled.hr`
  border: none;
  border-top: 0.1px solid var(--main-green);
  margin: 20px 0;
`;

const IconWrapper = styled.div`
  margin-right: 10px;
`;

const TopMargin = styled.div`
  width: 100%;
  height: 60px;
`;

const SmallMargin = styled.div`
  width: 100%;
  height: 5px;
`;

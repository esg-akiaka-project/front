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
  fetchPosts, // 게시글 목록을 불러오는 함수
  createPost, // 게시글 생성 함수
  fetchPostDetail, // 특정 게시글 세부 정보를 불러오는 함수
  createComment, // 댓글 생성 함수
  fetchComments, // 댓글 목록을 불러오는 함수
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

// 게시글 타입 정의
interface Post {
    id: number;
    photo: string;
    comment: string;
}

const CommunityHome: React.FC = () => {
  const {
    selectedPhoto,
    setSelectedPhoto,
    comment,
    setComment,
    // isCommentOpen,
    toggleCommentSection,
  } = useCommunityStore();

  const { memberId } = useUserStore();

  const [posts, setPosts] = useState<PostProps[]>([
    {
      shareAuthorNickname: "지구",
      goalName: "게임",
      shareDoyakId: 3,
      shareContent: "도약이의 편지 자랑할래요",
      shareImageUrl:
        "https://harudoyak-s3bucket.s3.ap-northeast-2.amazonaws.com/049a622d-784c-4cb5-b2c1-d61f45e60f70.png",
      commentCount: 0,
      doyakCount: 0,
      resComments: [],
    },
    {
      shareAuthorNickname: "소중해",
      goalName: "돈 벌기",
      shareDoyakId: 2,
      shareContent: "도약이의 편지 자랑할래요",
      shareImageUrl:
        "https://harudoyak-s3bucket.s3.ap-northeast-2.amazonaws.com/a9b52471-83f8-4457-86f5-7f92c97456a1.png",
      commentCount: 2,
      doyakCount: 1,
      resComments: [
        {
          commentShareDoyakId: 2,
          commentId: 4,
          commentContent: "commentContente",
          commentAuthorNickname: "test",
        },
        {
          commentShareDoyakId: 2,
          commentId: 5,
          commentContent: "commentContenteTest",
          commentAuthorNickname: "test",
        },
      ],
    },
    {
      shareAuthorNickname: "닉네임아무거나",
      goalName: "취업",
      shareDoyakId: 1,
      shareContent: '{\r\n    "shareContent" : "업데이트"\r\n}',
      shareImageUrl:
        "https://harudoyak-s3bucket.s3.ap-northeast-2.amazonaws.com/15fecf2d-f191-45e4-bf20-b0629106c058.png",
      commentCount: 3,
      doyakCount: 0,
      resComments: [
        {
          commentShareDoyakId: 1,
          commentId: 1,
          commentContent: "commentContente",
          commentAuthorNickname: "nickname",
        },
        {
          commentShareDoyakId: 1,
          commentId: 2,
          commentContent: "commentContente",
          commentAuthorNickname: "nickname",
        },
        {
          commentShareDoyakId: 1,
          commentId: 3,
          commentContent: "commentContente",
          commentAuthorNickname: "test",
        },
      ],
    },
  ]);

  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState<number>(0);
  const [showSideHeader, setShowSideHeader] = useState<boolean>(false);

  const postRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();

        const formattedData = data.map((post: PostProps) => ({
          shareDoyakId: post.shareDoyakId,
          photo: post.shareImageUrl,
          comment: post.shareContent,
          doyakCount: post.doyakCount,
          commentCount: post.commentCount,
          nickname: post.shareAuthorNickname,
          goalName: post.goalName,
        }));
        setPosts(formattedData);
        console.log("hi");
      } catch (error) {
        console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    loadPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowSideHeader(window.scrollY > 100); // 스크롤 위치가 100 이상이면 SideHeader를 표시
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // 컴포넌트가 언마운트될 때 이벤트 제거
  }, []);

  useEffect(() => {
    if (isCommentOpen) {
      document.body.style.overflow = "hidden"; // 댓글 섹션이 열리면 스크롤 비활성화
    } else {
      document.body.style.overflow = "auto"; // 댓글 섹션이 닫히면 스크롤 활성화
    }
  }, [isCommentOpen]);

  // 특정 게시글로 스크롤 이동 및 댓글 섹션 열기
  const handleCommentButtonClick = (index: number) => {
    setSelectedPostIndex(index);
    setIsCommentOpen(true);
    // toggleCommentSection(); // 댓글 섹션 열림/닫힘 토글
    if (postRefs.current[index]) {
      postRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      }); // 해당 게시글로 스크롤
    }
  };

  const handleDoyakCount = async (shareDoyakId: number) => {
    console.log("좋아요 체크");
    if (memberId === null) {
      return;
    }
    try {
      const response = await addDoyak(memberId, shareDoyakId);
    } catch (error) {
      console.log(error);
    }
  };

  const closeCommentSection = () => {
    setIsCommentOpen(false);
    setSelectedPostIndex(0);
  };
  return (
    <Root>
      <MainHeader />
      {showSideHeader && <SideHeader />}{" "}
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
                    onClick={() => handleDoyakCount(post.shareDoyakId)}
                  />
                </IconWrapper>

                <NumberDoyak count={post.doyakCount} />
                <CommentButton
                  onClick={() => handleCommentButtonClick(index)}
                />
                <NumberComment commentCnt={post.commentCount} />
              </ButtonContainer>
              {/* <CommentText>{post.commentContent}</CommentText> */}
            </Post>
            {index < posts.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </PostList>
      {/* 댓글 섹션 열림/닫힘 상태에 따라 렌더링 */}
      {isCommentOpen && (
        <CommentSection
          onClose={closeCommentSection}
          comments={posts[selectedPostIndex].resComments}
        />
      )}
      <WriteButton /> {/* 게시글 작성 버튼 */}
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

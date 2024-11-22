import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EditHeader } from "../../components/community/EditHeader";
import { EditCancelNextBar } from "../../components/community/EditCancelNextBar";
import { PhotoGrid } from "../../components/community/PhotoGrid";
import { EditMainPhoto } from "../../components/community/EditMainPhoto";
import Root from "../../style/Root";
import { useRouter } from "next/router";
import { fetchPosts } from "@/src/apis/seoroApi";

interface Post {
  shareDoyakId: number;
  shareImageUrl: string;
  shareContent: string;
  doyakCount: number;
  commentCount: number;
  shareAuthorNickname: string;
  goalName: string;
}

const EditPicture: React.FC = () => {
  const router = useRouter();
  const { query } = router;
  const { shareDoyakId } = query;

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    console.log("받아온 shareDoyakId:", shareDoyakId);
    if (!shareDoyakId) return;

    const loadPosts = async () => {
      try {
        const posts: Post[] = await fetchPosts();
        console.log("가져온 게시글 데이터:", posts);

        const targetPost = posts.find((post) => post.shareDoyakId === Number(shareDoyakId));
        console.log("선택된 게시글:", targetPost);

        if (targetPost) {
          setSelectedPhoto(targetPost.shareImageUrl);
        } else {
          console.error("해당 게시글을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    loadPosts();
  }, [shareDoyakId]);

  const handleNextClick = () => {
    if (!selectedPhoto) {
      alert("사진을 선택해주세요!");
      return;
    }

    router.push({
      pathname: "/community/edit-comment",
      query: { shareDoyakId, selectedPhoto },
    });
  };

  return (
    <Root>
      <EditHeader />
      <Heading1></Heading1>
      <EditCancelNextBar onNext={handleNextClick} />
      {selectedPhoto ? (<EditMainPhoto shareImageUrl={selectedPhoto} />
      ) : (
        <p>이미지를 로드 중입니다...</p>
      )}
      <PhotoGrid setSelectedPhoto={setSelectedPhoto} />
    </Root>
  );
};

export default EditPicture;

const Heading1 = styled.h1`
  font-size: 1.44rem;
  color: var(--main-green);
  margin-bottom: 4px;
`;

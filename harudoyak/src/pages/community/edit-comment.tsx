import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EditHeader } from "../../components/community/EditHeader";
import { EditCancelBar } from "../../components/community/EditCancelBar";
import EditCommentInput from "@/src/components/community/EditCommentInput";
import EdButton from "../../components/community/EdButton";
import Root from "../../style/Root";
import { useRouter } from "next/router";
import { fetchPosts } from "../../apis/seoroApi";

interface Post {
  shareDoyakId: number;
  shareContent: string;
}

const EditCommentPage: React.FC = () => {
  const router = useRouter();
  const { query } = router;
  const { shareDoyakId } = query;

  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    if (!shareDoyakId) return;

    const loadPosts = async () => {
      try {
        const posts: Post[] = await fetchPosts();
        const targetPost = posts.find((post) => post.shareDoyakId === Number(shareDoyakId));

        if (targetPost) {
          setComment(targetPost.shareContent);
          console.log("게시글 데이터:", targetPost);
        } else {
          console.error("해당 게시글을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    loadPosts();
  }, [shareDoyakId]);

  return (
    <Root>
      <EditHeader />
      <Heading1></Heading1>
      <EditCancelBar />
      <EditCommentInput shareDoyakId={Number(shareDoyakId)} />
      <EdButton
        shareDoyakId={Number(shareDoyakId)}
        shareContent={String(comment)}
      />
    </Root>
  );
};

export default EditCommentPage;

const Heading1 = styled.h1`
  font-size: 1.44rem;
  color: var(--main-green);
  margin-bottom: 10px;
`;

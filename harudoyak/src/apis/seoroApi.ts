import axiosInstance from "./axiosInstance";
import { useUserStore } from "../store/useUserStore";
import useCommunityStore from "../store/useCommunityStore";
import { uploadToS3Seoro } from "./uploadToS3Seoro";

// 게시글 작성 API
export const createPost = async (comment: string, photoUrl: string) => { // photoUrl을 string으로 받음
  const { memberId } = useUserStore.getState();
  
  if (!memberId) {
    throw new Error("memberId가 유효하지 않습니다.");
  }


  try {
    console.log("게시글 작성 요청\n내용:", comment, "이미지 URL:", photoUrl);
    
    // 백엔드로 게시글 데이터 전송
    const response = await axiosInstance.post(`/posts/${memberId}`, {
      shareContent: comment,
      shareImegeUrl: photoUrl,
    });
    console.log("백엔드로 게시글 데이터 전송");

    return response.data;
  } catch (error) {
    console.error("게시글 작성 실패///서로Api.ts:", error);
    throw error;
  }
};


// 도약하기 추가 API
export const addDoyak = async (memberId: number, shareDoyakId: number) => {
  try {
    const response = await axiosInstance.post(`/posts/doyak/${memberId}/${shareDoyakId}`);
    return response.data;
  } catch (error) {
    console.error("도약하기 추가 실패:", error);
    throw error;
  }
};

// 댓글 작성 API
export const createComment = async (shareDoyakId: number, commentContent: string) => {
  const { memberId } = useCommunityStore.getState();
  try {
    const response = await axiosInstance.post(`/posts/comments/${memberId}/${shareDoyakId}`, {
      commentContent,
    });
    return response.data;
  } catch (error) {
    console.error("댓글 작성 실패:", error);
    throw error;
  }
};

// 댓글 목록 조회 API
export const fetchComments = async (shareDoyakId: number) => {
  try {
    const response = await axiosInstance.get(`/posts/comments/list/${shareDoyakId}`);
    return response.data;
  } catch (error) {
    console.error("댓글 목록 조회 실패:", error);
    throw error;
  }
};

// 게시글 목록 조회 API
export const fetchPosts = async () => {
  try {
    const response = await axiosInstance.get(`/posts/list`);
    return response.data;
  } catch (error) {
    console.error("게시글 목록 조회 실패:", error);
    throw error;
  }
};

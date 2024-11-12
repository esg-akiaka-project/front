import axiosInstance from "./axiosInstance";
import { useUserStore } from "../store/useUserStore";
import useCommunityStore from "../store/useCommunityStore";
import { uploadToS3Seoro } from "./uploadToS3Seoro";

// 게시글 작성 API
export const createPost = async (comment: string, photo: File) => {
  const { memberId } = useUserStore.getState();

  try {
    // 사진 파일을 S3에 업로드하여 URL을 얻음
    const photoUrl = await uploadToS3Seoro(photo);

    console.log("게시글 작성 요청\n내용:", comment, "이미지 URL:", photoUrl);
    
    // 백엔드로 게시글 데이터 전송
    const response = await axiosInstance.post(`/api/posts/${memberId}`, {
      shareContent: comment,
      shareImageUrl: photoUrl,
    });

    return response.data;
  } catch (error) {
    console.error("게시글 작성 실패:", error);
    throw error;
  }
};

// 도약하기 추가 API
export const addDoyak = async (memberId: number, shareDoyakId: number) => {
  try {
    const response = await axiosInstance.post(`/api/posts/doyak/${memberId}/${shareDoyakId}`);
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
    const response = await axiosInstance.post(`/api/posts/comments/${memberId}/${shareDoyakId}`, {
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
    const response = await axiosInstance.get(`/api/posts/comments/list/${shareDoyakId}`);
    return response.data;
  } catch (error) {
    console.error("댓글 목록 조회 실패:", error);
    throw error;
  }
};

// 게시글 목록 조회 API
export const fetchPosts = async () => {
  try {
    const response = await axiosInstance.get(`/api/posts/list`);
    return response.data;
  } catch (error) {
    console.error("게시글 목록 조회 실패:", error);
    throw error;
  }
};

import axiosInstance from "./axiosInstance";
import { useCommunityStore } from '../store/useCommunityStore';
import { useUserStore } from "../store/useUserStore";

// 게시글 작성 API (사진 포함)
export const createPost = async (photo: File, comment: string) => {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("comment", comment);

  try {
    const response = await axiosInstance.post("community/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 게시글 목록 조회 API
export const fetchPosts = async () => {
  try {
    const response = await axiosInstance.get("community/posts");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 특정 게시글 조회 API (닉네임, 도약목표, 댓글 포함)
export const fetchPostDetail = async (postId: string) => {
  const { nickname, leapGoal, comments } = useCommunityStore.getState();
  const { userId } = useUserStore.getState();
  
  try {
    const response = await axiosInstance.get(`community/posts/${postId}`, {
      params: {
        nickname,
        leapGoal,
        comments,
        userId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 댓글 작성 API
export const createComment = async (postId: string, comment: string) => {
  const { userId } = useCommunityStore.getState();
  try {
    const response = await axiosInstance.post(`community/posts/${postId}/comments`, {
      userId,
      comment,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 댓글 목록 조회 API
export const fetchComments = async (postId: string) => {
  const { comments } = useCommunityStore.getState();
  try {
    const response = await axiosInstance.get(`community/posts/${postId}/comments`, {
      params: {
        comments,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

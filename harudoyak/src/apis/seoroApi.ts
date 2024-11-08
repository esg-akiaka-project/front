import axiosInstance from "./axiosInstance";
import axios from "axios";
import { useCommunityStore } from '../store/useCommunityStore';
import { useUserStore } from "../store/useUserStore";
import { uploadToS3 } from './uploadToS3';

// 게시글 작성 API (S3 URL 사용)
export const createPost = async (photo: File, comment: string) => {
  const { memberId } = useUserStore.getState();
  
  try {
    const photoUrl = await uploadToS3(photo);

    const response = await axiosInstance.post(`/api/posts/${memberId}`, {
      shareContent: comment,
      shareImageUrl: photoUrl,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 게시글 목록 조회 API
export const fetchPosts = async () => {
  try {
    const response = await axiosInstance.get(`/api/posts/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 특정 게시글 조회 API (닉네임, 도약목표, 댓글 포함)
export const fetchPostDetail = async (shareDoyakId: number) => {
  try {
    const response = await axiosInstance.get(`/api/posts/${shareDoyakId}`);
    return response.data;
  } catch (error) {
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
    throw error;
  }
};

// 댓글 목록 조회 API
export const fetchComments = async (shareDoyakId: number) => {
  try {
    const response = await axiosInstance.get(`/api/posts/comments/list/${shareDoyakId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 도약하기 추가 API
export const addDoyak = async (memberId: number, shareDoyakId: number) => {
  try {
    const response = await axiosInstance.post(`/api/posts/doyak/${memberId}/${shareDoyakId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

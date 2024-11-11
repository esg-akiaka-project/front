import axiosInstance from "./axiosInstance";
import axios from "axios";
// import { useCommunityStore } from '../store/useCommunityStore';
import useCommunityStore from "../store/useCommunityStore";
import { useUserStore } from "../store/useUserStore";

// S3에 파일 업로드 함수
export const uploadToS3 = async (photo: File) => {
  const timestamp = Date.now();
  const extension = photo.name.split(".").pop();
  const fileName = `${timestamp}.${extension}`;

  try {
    const { data: uploadUrl } = await axiosInstance.get(
      `s3/upload-url?fileName=${fileName}`
    );
    const formData = new FormData();
    formData.append("file", photo);

    await axios.put(uploadUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return uploadUrl.split("?")[0];
  } catch (error) {
    throw new Error("S3 업로드 실패: " + error);
  }
};

// seoroApi.ts
export const createPost = async (photo: File | string, comment: string) => {
  const { memberId } = useUserStore.getState();

  try {
    let photoUrl: string;

    if (typeof photo === 'string') {
      // photo가 URL인 경우
      photoUrl = photo;
    } else {
      // photo가 File인 경우
      photoUrl = await uploadToS3(photo);
    }

    const response = await axiosInstance.post(`posts/${memberId}`, {
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
    const response = await axiosInstance.get(`posts/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 특정 게시글 조회 API (닉네임, 도약목표, 댓글 포함)
export const fetchPostDetail = async (shareDoyakId: number) => {
  try {
    const response = await axiosInstance.get(`posts/${shareDoyakId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 댓글 작성 API
export const createComment = async (
  shareDoyakId: number,
  commentContent: string
) => {
  const { memberId } = useCommunityStore.getState();
  try {
    const response = await axiosInstance.post(
      `posts/comments/${memberId}/${shareDoyakId}`,
      {
        commentContent,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 댓글 목록 조회 API
export const fetchComments = async (shareDoyakId: number) => {
  try {
    const response = await axiosInstance.get(
      `posts/comments/list/${shareDoyakId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 도약하기 추가 API
export const addDoyak = async (memberId: number, shareDoyakId: number) => {
  try {
    const response = await axiosInstance.post(
      `posts/doyak/${memberId}/${shareDoyakId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

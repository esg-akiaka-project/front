// 도약기록 관련 api 모음
import axios from "axios";
import axiosInstance from "./axiosInstance";
import { useUserStore } from "../store/useUserStore";
import { uploadToS3 } from './uploadToS3';

export type RecordItem = {
  logId: number;
  creationDate: string;
};

export const fetchRecordList = async (): Promise<RecordItem[]> => {
  try {
    const { memberId } = useUserStore.getState();
    const response = await axiosInstance.get(`logs/list/${memberId}`, {
      params: {
        memberId: memberId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 도약기록 쓰기 API (S3 URL 사용)
export const createPost = async (text: string, emotion: string, image: File|null, tags: string[]) => {
  const { memberId } = useUserStore.getState();

  try {
    const photoUrl = image? await uploadToS3(image) : null;
    console.log("작성된 도약 기록\n text:", text, "emotion:", emotion, "imageUrl:", photoUrl, "tags:", tags)
    const response = await axiosInstance.post(`/api/posts/${memberId}`, {
      memberId: memberId,
      logContent:text,
      tagNameList: tags,
      emotion: emotion,
      logImageUrl: photoUrl
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


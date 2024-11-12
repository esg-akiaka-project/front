// 도약기록 관련 api 모음
import axiosInstance from "./axiosInstance";
import { useUserStore } from "../store/useUserStore";
import { uploadToS3 } from './uploadToS3';

export type RecordItem = {
  logId: number;
  creationDate: string;
};

export const fetchRecordList = async (): Promise<RecordItem[]> => {
  const { memberId } = useUserStore.getState();
  const response = await axiosInstance.get(`logs/list/${memberId}`, {
    params: {
      memberId: memberId,
    },
  });
  return response.data;
};

// 도약기록 쓰기 API (image -> S3 URL 사용)
export const createPost = async (text: string, emotion: string, image: File|null, tags: string[]) => {
  const { memberId } = useUserStore.getState();

  if (!memberId) {
    throw new Error("memberId가 유효하지 않습니다.");
  }

  try {
    const photoUrl = image? await uploadToS3(image) : null;
    console.log("작성된 도약 기록\n text:", text, "emotion:", emotion, "imageUrl:", photoUrl, "tags:", tags)
    
    const tagNameList = tags.map(tag => ({ tagName: tag}));

    const response = await axiosInstance.post(`/api/logs/${memberId}`, {
      logContent: text,
      tagNameList: tagNameList,
      emotion: emotion,
      logImageUrl: photoUrl,
    }, {
      params: {memberId: memberId}
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



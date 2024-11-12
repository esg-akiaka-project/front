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

// 도약기록 쓰기 API (image 파일로 받아서, 내부에서 uploadToS3 함수 호출(서버에 url로 전송))
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

// POST 도약이 편지 저장
export const saveLetter = async (letter: string, logId: string) => {
  const { memberId } = useUserStore.getState();

  if (!memberId) {
    throw new Error("memberId가 유효하지 않습니다.");
  }

  try {
    console.log("도약이의 편지가 서버에 전송됩니다. /api/logs/letters/${memberId}/${logId}")
    
    const response = await axiosInstance.post(`/api/logs/letters/${memberId}/${logId}`, {
      letterContent: letter,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


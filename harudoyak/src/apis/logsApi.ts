// 도약기록 관련 api 모음
import axios from "axios";
import axiosInstance from "./axiosInstance";
import { useUserStore } from "../store/useUserStore";
import { uploadToS3 } from "./uploadToS3";

export type RecordItem = {
  logId: number;
  creationDate: string;
};

export const fetchRecordList = async (): Promise<RecordItem[]> => {
  const { memberId } = useUserStore.getState();

  // console.log("memberId:", memberId); // memberId가 올바른지 확인
  if (!memberId) {
      throw new Error("유효하지 않은 memberId입니다.");
  }

  try {
    const response = await axiosInstance.get(`logs/list/${memberId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError인 경우, 추가 정보 출력
      console.error("Axios Error:", error.toJSON());
      console.error("Response Status:", error.response?.status);
      console.error("Response Data:", error.response?.data);
    } else {
      // 일반적인 오류인 경우, 기본 에러 메시지 출력
      const generalError = error as Error;
      console.error("Error:", generalError.message);
    }
    throw Error; // 필요 시 에러를 다시 던짐
  }
};

// 도약기록 쓰기 API 
export const createPost = async (
  text: string,
  emotion: string,
  photoUrl: string | null,
  tags: string[]
) => {
  const { memberId } = useUserStore.getState();

  if (!memberId) {
    throw new Error("memberId가 유효하지 않습니다.");
  }

  try {
    //const photoUrl = image ? await uploadToS3(image) : null;
    const tagNameList = tags.map((tag) => ({ tagName: tag }));
    console.log(
  "logContent:", text,
  "\ntagNameList:", tagNameList,
  "\nemotion:", emotion,
  "\nlogImageUrl:", photoUrl
);
    const response = await axiosInstance.post(
      `/logs/${memberId}`,
      {
        logContent: text,
        tagNameList: tagNameList,
        emotion: emotion,
        logImageUrl: photoUrl,
      }
    );
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
    console.log(
      "도약이의 편지가 서버에 전송됩니다. /api/logs/letters/${memberId}/${logId}"
    );

    const response = await axiosInstance.post(
      `/logs/letters/${memberId}/${logId}`,
      {
        letterContent: letter,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


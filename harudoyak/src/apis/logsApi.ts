// 도약기록 관련 api 모음
import axios from "axios";
import axiosInstance from "./axiosInstance";
import { useUserStore } from "../store/useUserStore";

export const fetchRecordList = async () => {
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

// S3에 파일을 업로드하는 함수
export const uploadToS3 = async (photo: File) => {
  const timestamp = Date.now();
  const extension = photo.name.split('.').pop();
  const fileName = `${timestamp}.${extension}`;

  try {
    const { data: uploadUrl } = await axiosInstance.get(`/s3/upload-url?fileName=${fileName}`);
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


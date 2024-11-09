// 도약기록 관련 api 모음
import axiosInstance from "./axiosInstance";
import { useUserStore } from "../store/useUserStore";

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

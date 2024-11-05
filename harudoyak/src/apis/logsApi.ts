// 도약기록 관련 api 모음
import axiosInstance from "./axiosInstance";
import { useUserStore } from "../store/useUserStore";

export const RecordDayList = async () => {
    try{
        const { userId } = useUserStore.getState();
        const response = await axiosInstance.get(`logs/list/${userId}`, {
            memberId: userId // 이 부분 수정 필요
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};



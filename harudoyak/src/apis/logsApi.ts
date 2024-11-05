// 도약기록 관련 api 모음
import axiosInstance from "./axiosInstance";
import { useUserStore } from "../store/useUserStore";

export const RecordDayList = async () => {
    try{
        const { userId } = useUserStore.getState();
        const response = await axiosInstance.get(`logs/list/${userId}`, {
            params: {
                memberId: userId
            }   
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};



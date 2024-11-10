// 로그인 , 회원가입 관련 api 모음.
import axiosInstance from "./axiosInstance";
import { useUserStore } from "../store/useUserStore";

export const certifyEmail = async (email: string) => {
  try {
    const response = await axiosInstance.post(
      `auth/email/verify`,

      {
        email: email,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CheckDuplicateNickname = async (nickname: string) => {
  try {
    const response = await axiosInstance.get(
      `members/check?nickname=${nickname}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface SignupProps {
  email: string;
  isVerified: boolean;
  password: string;
  nickname: string;
}
export const CompeleteSignup = async (signupProps: SignupProps) => {
  try {
    const response = await axiosInstance.post("auth/join", signupProps);
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface LoginProps {
  email: string;
  password: string;
}
export const Login = async (LoginProps: LoginProps) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, LoginProps);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const setAiGoal = async (aiName: string, goal: string) => {
  const { memberId } = useUserStore.getState();
  try {
    const response = await axiosInstance.post("/ai", {
      memId: memberId,
      aiNickName: aiName,
      goalId: goal,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (
  oldpassword: string,
  newpassword: string
) => {
  const { memberId } = useUserStore.getState();
  try {
    const response = await axiosInstance.patch(`members/${memberId}/pwd`, {
      oldpassword,
      newpassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

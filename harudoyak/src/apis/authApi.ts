// 로그인 , 회원가입 관련 api 모음.
import axiosInstance from "./axiosInstance";
import { useUserStore } from "../store/useUserStore";

export const certifyEmail = async (email: string) => {
  const response = await axiosInstance.post(`auth/email/verify`, {
    email,
  });
  return response.data;
};

export const CheckDuplicateNickname = async (nickname: string) => {
  const response = await axiosInstance.get(
    `members/check?nickname=${nickname}`
  );
  return response.data;
};

interface SignupProps {
  email: string;
  password: string;
  nickname: string;
  isVerified: boolean;
}
export const CompeleteSignup = async (signupProps: SignupProps) => {
  const response = await axiosInstance.post("auth/join", signupProps);
  return response.data;
};

interface LoginProps {
  email: string;
  password: string;
}
export const Login = async (LoginProps: LoginProps) => {
  const response = await axiosInstance.post(`/auth/login`, LoginProps);
  return response;
};

export const checkPassword = async (password: string) => {
  const { memberId } = useUserStore.getState();
  const response = await axiosInstance.post(`/members/${memberId}/pwd`, {
    password,
  });
  return response;
};

export const changePassword = async (
  oldpassword: string,
  newpassword: string
) => {
  const { memberId } = useUserStore.getState();
  const response = await axiosInstance.put(`members/${memberId}/pwd`, {
    oldpassword,
    newpassword,
  });
  return response.data;
};

export const changeAiname = async (aiNickname: string) => {
  const { memberId } = useUserStore.getState();
  const response = await axiosInstance.put(`members/${memberId}/aiNickname`, {
    aiNickname,
  });
  return response.data;
};

export const changeNickname = async (nickname: string) => {
  const { memberId } = useUserStore.getState();
  const response = await axiosInstance.put(`members/${memberId}/nickname`, {
    nickname,
  });
  return response.data;
};

export const changeGoal = async (goalName: string) => {
  const { memberId } = useUserStore.getState();
  const response = await axiosInstance.put(`members/${memberId}/goalName`, {
    goalName,
  });
  return response.data;
};

export const changeProfileImg = async (photoUrl: string) => {
  const { memberId } = useUserStore.getState();
  const response = await axiosInstance.put(`members/${memberId}/profile`, {
    photoUrl,
  });
  return response.data;
};

export const findPassword = async (email: string) => {
  const response = await axiosInstance.post(`auth/temp-password`, {
    email,
  });
  return response;
};

export const kakaoLogin = async (code: string) => {
  const response = await axiosInstance.post(`auth/login/kakao`, {
    code,
  });
  return response.data;
};

export const googleLogin = async (code: string) => {
  const response = await axiosInstance.post(`auth/login/google`, {
    code,
  });
  return response.data;
};

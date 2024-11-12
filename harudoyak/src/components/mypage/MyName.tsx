// todo: 닉네임 api 연동

import React from "react";
import { useUserStore } from "@/src/store/useUserStore";

const MyName: React.FC = () => {
  const { nickname } = useUserStore();
  // const name = nickname === null ? "닉네임 없음" : nickname;

  return <p>{nickname}</p>;
};
export default MyName;

// todo: 닉네임 api 연동

import React from "react";
import { useUserStore } from "@/src/store/useUserStore";
import styled from "styled-components";

const MyName: React.FC = () => {
  const { nickname } = useUserStore();
  // const name = nickname === null ? "닉네임 없음" : nickname;

  return <NicknameTag>{nickname}</NicknameTag>;
};
export default MyName;

const NicknameTag = styled.p`
  font-weight: bold;
`;

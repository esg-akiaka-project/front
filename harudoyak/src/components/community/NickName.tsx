// src/components/community/NickName.tsx
import React from "react";
import styled from "styled-components";

interface NickNameProps {
  nickname: string; // props 타입 정의
}

const NickName: React.FC<NickNameProps> = ({ nickname }) => {
  return <NickNameContainer>{nickname}</NickNameContainer>;
};

export default NickName;

const NickNameContainer = styled.div`
  font-size: 0.9rem !important; /* 폰트 사이즈 줄임 */
  font-weight: bold !important;
  color: # !important; /* 색깔을 흰색으로 변경 */
  margin-bottom: 1px !important;
`;

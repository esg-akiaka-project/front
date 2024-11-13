// todo: 경험치에 따른 레벨을 정해야함 + 뱃지 이미지

import React from "react";
import { useUserStore } from "@/src/store/useUserStore";

const MyLevel: React.FC = () => {
  const { exp } = useUserStore();
  return <p>EXP: {exp}</p>;
};
export default MyLevel;

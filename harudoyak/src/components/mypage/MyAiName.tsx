import React from "react";
import { useUserStore } from "@/src/store/useUserStore";

const MyAiName: React.FC = () => {
  const { aiName } = useUserStore();
  const ai = aiName === null ? "ai없음" : aiName;
  return <p>{ai}</p>;
};
export default MyAiName;

import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { PostDataContextType } from "@/src/context/PostDataContext";

// logsApi.ts에서 API 함수 임포트
import { createPost } from "@/src/apis/logsApi";

interface SubmitButtonProps {
  text: string;
  image: File | null;
  emotion: string;
  tags: string[];
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  image,
  emotion,
  tags,
}) => {
  const handleSubmit = async () => {
    console.log("작성된 도약 기록\n text:", text, "emotion:", emotion, "image:", image, "tags:", tags);
    try {
      const response = await createPost(text, emotion, image, tags);
      console.log("기록 작성 성공:", response);
    } catch (error) {
      console.log("기록 작성 실패:", error);
    }
  };
  return <Button onClick={handleSubmit}>도약기록 남기기</Button>;
};
export default SubmitButton;

// styled-components
const Button = styled.button`
  display: fixed;
  bottom: 10px;
  border-radius: 20px;
  background: #3c7960;
  width: 100%;
  padding: 10px 0px;
  color: #ffffff;
  font-size: 1.13rem;
  text-align: center;
  bottom: 0;
  margin-top: 60px;
`;

const Testbutton = styled.button<{ $data: boolean; $display: boolean }>`
  background: ${({ $data }) => ($data === true ? "#3C7960" : "#D9D9D9")};
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  align-items: center;
  justify-content: center;
  display: ${({ $display }) => ($display ? "flex" : "None")};
  cursor: ${({ $data }) => ($data ? "pointer" : "not-allowed")};
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

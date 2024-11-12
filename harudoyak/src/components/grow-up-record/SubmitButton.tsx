import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { PostDataContextType } from "@/src/context/PostDataContext";
import axios from "axios";
import { useRouter } from "next/router";

// logsApi.ts에서 API 함수 import
import { createPost, saveLetter } from "@/src/apis/logsApi";

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
  const router = useRouter();

  const handleSubmit = async () => {
    console.log(
      "작성된 도약 기록\n text:",
      text,
      "emotion:",
      emotion,
      "image:",
      image,
      "tags:",
      tags,
    );
    try {
      const createPostResponse = await createPost(text, emotion, image, tags);
      console.log("기록 작성 성공:", createPostResponse.content);

      const logId = createPostResponse.logId;

      const letterResponse = await axios.post("/api/openai/letter", {
        text: `${emotion}, ${text}`,
      });

      if (letterResponse.status === 2000) {
        const letter = letterResponse.data.letter;
        console.log("도약이의 편지가 생성되었습니다:", letter);

        await saveLetter(letter, logId);
        console.log("Letter saved successfully");

        router.push(`/`);
      } else {
        console.error("도약이 편지 생성에 실패했습니다.");
      }
    } catch (error) {
      console.log("도약기록 저장을 실패했습니다:", error);
    }
  };

  return <Button onClick={handleSubmit}>도약기록 남기기</Button>;
};
export default SubmitButton;

// styled-components
const Button = styled.button`
  display: fixed;

  border-radius: 20px;
  background: #3c7960;
  width: 100%;
  padding: 10px 0px;
  color: #ffffff;
  font-size: 1.13rem;
  text-align: center;
  bottom: 0;
  margin-top: 7px;
  margin-bottom: 14px;
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

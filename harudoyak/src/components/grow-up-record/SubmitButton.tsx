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
  onSuccess: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  image,
  emotion,
  tags,
  onSuccess,
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

      if (letterResponse.status === 200) {
        const letter = letterResponse.data.letter;
        console.log("도약이의 편지가 생성되었습니다:", letter);

        await saveLetter(letter, logId);
        console.log("도약이 편지 저장 성공!");

        onSuccess();
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
  bottom: 0%;
  margin-top: 110px;
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

import React from "react";
import styled from "styled-components";

import { createPost, saveLetter } from "@/src/apis/logsApi";
import { createLetter } from "@/src/apis/openAIApi";

interface SubmitButtonProps {
  text: string;
  image: string | null;
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
  const requestData = `${emotion}, ${text}`;

  const handleSubmit = async () => {
    try {
      // 도약 기록 생성
      const createPostResponse = await createPost(text, emotion, image, tags);
      const logId = createPostResponse?.logId;

      if (!logId) {
        throw new Error("logId를 생성하지 못했습니다. (createPost error)");
      }

      // 도약이 편지 생성 및 저장
      const letter = await createLetter(requestData);

      await saveLetter(letter, logId);
      console.log("도약이 편지 저장 성공!");
      onSuccess();
    } catch (error) {
      console.log("error:", error);
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

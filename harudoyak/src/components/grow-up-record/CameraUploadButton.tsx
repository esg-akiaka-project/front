// CameraUploadButton
import React from "react";
import styled from "styled-components";
import Image from "next/image";

// src와 children을 받도록 설정
interface CameraUploadButtonProps {
  src: string;
  children: React.ReactNode;
}

const UploadOptionBtn: React.FC<CameraUploadButtonProps> = ({ src, children }) => {
  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Captured Image:", file);
      // 서버 전송 url
    }
  }
  return (
    <Label>
      <Image src={src} alt="" /> 
      <ButtonContents>{children}</ButtonContents>
      <HiddenInput type="file" accept="image/*" capture="environment" onChange={handleCapture}/>
    </Label>
  );
};

export default UploadOptionBtn;

const Label = styled.label`
  background: #ffffff;
  width: 49%;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 6px;
  padding-bottom: 6px;
  cursor: pointer;
`;

const ButtonContents = styled.div`
  margin-left: 8px;
  font-size: 0.75rem;
  color: var(--gray-from-grayscale);
`;

const HiddenInput = styled.input`
  display: none;
`;

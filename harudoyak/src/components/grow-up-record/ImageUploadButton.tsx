// ImageUploadButton.tsx
import React from "react";
import styled from "styled-components";
import Image from "next/image";

interface ImageUploadButtonProps {
  src: string;
  children: React.ReactNode;
  setPreviewUrl: (url: string) => void; // setPreviewUrl prop 추가
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  src,
  children,
  setPreviewUrl, // prop 받기
}) => {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files?.[0];
    if (file) {
      console.log("Selected image:", file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url); // 이미지 URL 업데이트
    }
  };

  return (
    <div>
      <Label>
        <Image src={src} alt="" />
        <ButtonContents>{children}</ButtonContents>
        <HiddenInput type="file" accept="image/*" onChange={handleFileSelect} />
      </Label>
    </div>
  );
};

export default ImageUploadButton;

const Label = styled.label`
  background: #ffffff;
  width: 8.4rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 6px;
  padding-bottom: 6px;
  cursor: pointer;
  white-space: nowrap;
`;

const ButtonContents = styled.div`
  margin-left: 8px;
  font-size: 0.75rem;
  color: var(--gray-from-grayscale);
`;

const HiddenInput = styled.input`
  display: none;
`;

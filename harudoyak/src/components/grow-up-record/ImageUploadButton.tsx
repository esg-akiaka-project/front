// ImageUploadButton.tsx
import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Preview from "./Preview";

interface ImageUploadButtonProps {
  src: string;
  children: React.ReactNode;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  src,
  children,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files?.[0];
    if (file) {
      console.log("Selected image:", file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDelete = () => {
    setPreviewUrl(null); // 미리보기 이미지 삭제
  };

  return (
    <div>
      <Label>
        <Image src={src} alt="" />
        <ButtonContents>{children}</ButtonContents>
        <HiddenInput type="file" accept="image/*" onChange={handleFileSelect} />
      </Label>
      {previewUrl && <Preview imageUrl={previewUrl} onDelete={handleDelete} />}
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

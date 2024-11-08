// ImageUploadButton.tsx
import React from "react";
import Image from "next/image";
import * as S from "./UploadButton.style";
import { uploadToS3 } from "@/src/apis/logsApi";

interface ImageUploadButtonProps {
  src: string;
  children: React.ReactNode;
  setPreviewUrl: (url: string) => void;
}

// s3 api 호출해서 previewurl 저장하고 띄우는 함수
const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  src,
  children,
  setPreviewUrl, // prop 받기
}) => {
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event?.target.files?.[0];
    if (file) {
      try {
        console.log("Selected image:", file);
        const photoUrl = await uploadToS3(file);
        console.log("Photo Url", photoUrl);
        setPreviewUrl(photoUrl);
      } catch (error) {
        console.error("파일 업로드 중 에러 발생:", error);
        alert("파일 업로드에 실패했습니다. 서버 상태를 확인해 주세요.");
      }
    }
  };

  return (
    <div>
      <S.Label>
        <Image src={src} alt="" />
        <S.ButtonContents>{children}</S.ButtonContents>
        <S.HiddenInput
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
        />
        <S.HiddenInput
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
        />
      </S.Label>
    </div>
  );
};

export default ImageUploadButton;

// ImageUploadButton.tsx
import React from "react";
import Image from "next/image";
import * as S from "./UploadButton.style";
import { uploadToS3 } from "@/src/apis/uploadToS3";

interface ImageUploadButtonProps {
  src: string;
  children: React.ReactNode;
  setImageUrl: (url: string) => void;
}

// s3 api 호출해서 ImageUrl 저장하고 띄우는 함수
const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  src,
  children,
  setImageUrl,
}) => {
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target.files?.[0];
    if (file) {
      try {
        const photoUrl = await uploadToS3(file);

        setImageUrl(photoUrl);
      } catch (error) {
        console.error("이미지 파일 업로드 중 에러 발생:", error);
        alert("이미지 파일 업로드에 실패했습니다. 서버 상태를 확인해 주세요.");
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
      </S.Label>
    </div>
  );
};

export default ImageUploadButton;

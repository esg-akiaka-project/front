// CameraUploadButton
import React from "react";
import * as S from "./UploadButton.style";
import Image from "next/image";
import { uploadToS3 } from "../../../apis/uploadToS3";

interface CameraUploadButtonProps {
  src: string;
  children: React.ReactNode;
  setImageUrl: (url: string) => void;
}

const UploadOptionBtn: React.FC<CameraUploadButtonProps> = ({
  src,
  children,
  setImageUrl,
}) => {
  const handleCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        console.log("Captured Image:", file);
        const photoUrl = await uploadToS3(file);
        console.log("Photo Url:", photoUrl);
        setImageUrl(photoUrl);
      } catch (error) {
        console.error("파일 업로드 중 에러 발생:", error);
        alert("파일 업로드에 실패했습니다. 서버 상태를 확인해 주세요.");
      }
    }
  };
  return (
    <S.Label>
      <Image src={src} alt="" />
      <S.ButtonContents>{children}</S.ButtonContents>
      <S.HiddenInput
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCapture}
      />
    </S.Label>
  );
};

export default UploadOptionBtn;

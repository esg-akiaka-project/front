// CameraUploadButton
import React from "react";
import * as S from "./UploadButton.style";
import Image from "next/image";
import { uploadToS3 } from "@/src/apis/logsApi";

interface CameraUploadButtonProps {
  src: string;
  children: React.ReactNode;
  setPreviewUrl: (url: string) => void;
}

const UploadOptionBtn: React.FC<CameraUploadButtonProps> = ({
  src,
  children,
  setPreviewUrl,
}) => {
  const handleCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Captured Image:", file);
      const photoUrl = await uploadToS3(file);
      console.log("Photo Url:", photoUrl);
      setPreviewUrl(photoUrl);
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

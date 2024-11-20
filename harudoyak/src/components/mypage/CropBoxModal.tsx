import React, { useState, useEffect } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import styled from "styled-components";
import "react-image-crop/dist/ReactCrop.css";

interface CropBoxModalProps {
  imageFile: File;
  onCropComplete: (croppedImage: File) => void;
  onClose: () => void;
}

const CropBoxModal: React.FC<CropBoxModalProps> = ({
  imageFile,
  onCropComplete,
  onClose,
}) => {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 100,
    height: 100,
    x: 10,
    y: 10,
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageRef(e.currentTarget);
  };

  const getCroppedImg = (): Promise<File> => {
    return new Promise((resolve, reject) => {
      if (!imageRef || !completedCrop?.width || !completedCrop?.height) {
        reject(new Error("크롭 영역이 유효하지 않습니다."));
        return;
      }

      const canvas = document.createElement("canvas");
      const scaleX = imageRef.naturalWidth / imageRef.width;
      const scaleY = imageRef.naturalHeight / imageRef.height;
      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("캔버스 컨텍스트를 가져올 수 없습니다."));
        return;
      }

      // 캔버스 배경색 설정
      ctx.fillStyle = "#F2F6F3"; // 흰색 배경
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx?.drawImage(
        imageRef,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const fileName = imageFile.name; // 원본 파일 이름 사용
            const croppedImageFile = new File([blob], fileName, {
              type: "image/jpeg",
            });
            resolve(croppedImageFile);
          } else {
            reject(new Error("캔버스가 비어 있습니다."));
          }
        },
        "image/jpeg",
        1
      );
    });
  };

  const handleCropConfirm = async () => {
    try {
      const croppedImageBlob = await getCroppedImg();
      onCropComplete(croppedImageBlob);
    } catch (error) {
      console.error("이미지 크롭 중 오류 발생:", error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ReactCrop
          crop={crop}
          onComplete={(c) => setCompletedCrop(c)}
          onChange={(newCrop) => setCrop(newCrop)}
        >
          <img
            src={imageSrc!}
            onLoad={onImageLoad}
            width={300}
            height={300}
            alt="크롭할 이미지"
          />
        </ReactCrop>

        <ButtonWrapper>
          <ModalButton onClick={handleCropConfirm}>크롭</ModalButton>
          <ModalButton onClick={onClose}>취소</ModalButton>
        </ButtonWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CropBoxModal;

// 스타일 컴포넌트들
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 10px;
  width: 50%;
  height: 35%;
  overflow: auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const ModalButton = styled.button`
  background-color: #3c7960;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
`;

// UploadSection.tsx
import React, { useState } from "react";
import styled from "styled-components";
import CameraUploadButton from "./CameraUploadButton";
import ImageUploadButton from "./ImageUploadButton";
import Preview from "./Preview";

import cameraIcon from "../../../../public/assets/grow-up-record/icon_camera.svg";
import imageIcon from "../../../../public/assets/grow-up-record/icon_image.svg";

interface UploadSectionProps {
  image: string;
  updateImage: (image: string) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  image,
  updateImage,
}) => {
  const handleDelete = () => {
    updateImage(""); // 미리보기 이미지 삭제
  };

  return (
    <Wrapper>
      <Text>이미지 업로드(선택)</Text>
      <FlexWrapper>
        <CameraUploadButton src={cameraIcon} setImageUrl={updateImage}>
          카메라 열기
        </CameraUploadButton>
        <ImageUploadButton src={imageIcon} setImageUrl={updateImage}>
          이미지 파일 추가
        </ImageUploadButton>
      </FlexWrapper>
      {image && <Preview imageUrl={image} onDelete={handleDelete} />}
    </Wrapper>
  );
};

export default UploadSection;

const Wrapper = styled.div`
  background: var(--background);
  border-radius: 18px;
  border: 1px dashed #6ead6b;
  margin-top: 16px;
  width: 100%;
  padding: 0 25px;
  margin-bottom: 25px;
`;

const Text = styled.p`
  text-align: center;
  font-size: 0.75rem;
  color: var(--gray-from-grayscale);
  margin-top: 20px;
  margin-bottom: 13px;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

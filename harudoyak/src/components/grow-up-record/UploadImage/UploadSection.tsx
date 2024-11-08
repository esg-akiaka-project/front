// UploadSection.tsx
import React, { useState } from "react";
import styled from "styled-components";
import CameraUploadButton from "./CameraUploadButton";
import ImageUploadButton from "./ImageUploadButton";
import Preview from "./Preview";

import cameraIcon from "../../../../public/assets/grow-up-record/icon_camera.svg";
import imageIcon from "../../../../public/assets/grow-up-record/icon_image.svg";

const UploadSection: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDelete = () => {
    setPreviewUrl(null); // 미리보기 이미지 삭제
  };

  return (
    <Wrapper>
      <Text>이미지 업로드(선택)</Text>
      <FlexWrapper>
        <CameraUploadButton src={cameraIcon} setPreviewUrl={setPreviewUrl}>카메라 열기</CameraUploadButton>
        <ImageUploadButton src={imageIcon} setPreviewUrl={setPreviewUrl}>
          이미지 파일 추가
        </ImageUploadButton>
      </FlexWrapper>
      {previewUrl && <Preview imageUrl={previewUrl} onDelete={handleDelete} />}
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

import React from "react";
import styled from "styled-components";
import UploadOptionBtn from "./UploadOptionBtn";

import cameraIcon from "../../../public/assets/grow-up-record/icon_camera.svg";
import imageIcon from "../../../public/assets/grow-up-record/icon_image.svg";

const ImageUpload: React.FC = () => {
  return (
    <Wrapper>
      <Text>이미지 업로드(선택)</Text>
      <FlexWrapper>
        <UploadOptionBtn src={cameraIcon}>카메라 열기</UploadOptionBtn>
        <UploadOptionBtn src={imageIcon}>이미지 파일 추가</UploadOptionBtn>
      </FlexWrapper>
    </Wrapper>
  );
};

export default ImageUpload;

const Wrapper = styled.div`
  background: var(--background);
  border-radius: 18px;
  border: 1px dashed #6ead6b;
  margin-top: 16px;
  width: 100%;
  height: 6.88rem;
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
`;




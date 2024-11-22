import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface EditMainPhotoProps {
  shareImageUrl: string;
}

const MainPhotoContainer = styled.div`
  width: 100%;
  height: 339px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--gray-from-grayscale);
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const EditMainPhoto: React.FC<EditMainPhotoProps> = ({ shareImageUrl }) => {
  const [photoSrc, setPhotoSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (shareImageUrl) {
      setPhotoSrc(shareImageUrl);
    }
  }, [shareImageUrl]);

  return (
    <MainPhotoContainer>
      {photoSrc ? (
        <Photo src={photoSrc} alt="Selected" />
      ) : (
        <p>이미지가 없습니다.</p>
      )}
    </MainPhotoContainer>
  );
};

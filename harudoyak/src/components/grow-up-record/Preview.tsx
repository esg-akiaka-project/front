import React from 'react';
import styled from 'styled-components';

interface PreviewProps {
  imageUrl: string;
  onDelete: () => void;
}

const Preview: React.FC<PreviewProps> = ({ imageUrl, onDelete }) => {
  return (
    <PreviewContainer>
      <PreviewImage src={imageUrl} alt="미리보기 이미지" />
      <DeleteButton onClick={onDelete}>삭제</DeleteButton>
    </PreviewContainer>
  );
};

export default Preview;

const PreviewContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin-top: 10px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.8rem;
`;
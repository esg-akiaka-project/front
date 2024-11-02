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
      <DeleteButton onClick={onDelete}>X</DeleteButton>
    </PreviewContainer>
  );
};

export default Preview;

const PreviewContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin-top: 10px;
  margin-bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0px;
  transform: translateY(-50%);
  right: 0px;
  background: #A6A6A6;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 0.8rem;
  text-align: center;
`;
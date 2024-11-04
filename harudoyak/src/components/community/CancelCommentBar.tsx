// src/components/community/CancelCommentBar.tsx
import React from 'react';
import styled from 'styled-components';

interface CancelCommentBarProps {
  onClose: () => void; // 닫기 함수 prop
}

const CancelCommentBar: React.FC<CancelCommentBarProps> = ({ onClose }) => {
  return (
    <BarContainer>
      <Button onClick={onClose}>이전</Button>
    </BarContainer>
  );
};

export default CancelCommentBar;

const BarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20px;
  padding: 10px;
  background-color: #f8f8f8;
`;

const Button = styled.button`
  color: #000;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: -0.33px;
  border: none;
  background: none;
  cursor: pointer;
`;

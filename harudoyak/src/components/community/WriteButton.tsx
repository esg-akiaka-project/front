// components/community/WriteButton.tsx
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Button = styled.button`
  position: fixed;
  bottom: 120px; /* 기존 bottom에서 100px 위로 올림 */
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--sub-green3);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const WriteButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/community/select-picture');
  };

  return <Button onClick={handleClick}>글쓰러 가기!</Button>;
};

export default WriteButton;

// src/components/community/CommentButton.tsx
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CommentIcon from '../../assets/community/commentbutton.svg';

const CommentButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/community/writesection'); // WriteSection으로 라우팅
  };

  return (
    <Button onClick={handleClick}>
      <Image src={CommentIcon} alt="Comment Icon" width={25} height={23} />
    </Button>
  );
};

export default CommentButton;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  outline: none;
`;

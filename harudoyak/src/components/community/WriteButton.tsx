import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image'; // next/image 모듈을 import

const Button = styled.button`
  position: fixed;
  bottom: 120px; /* 기존 bottom에서 100px 위로 올림 */
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 30%;
  background-color: var(--sub-green3);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10; //modal보다 낮은 값
`;

const WriteButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/community/select-picture');
  };

  return (
    <Button onClick={handleClick}>
      
      <Image
        src="/assets/community/sharebutton.svg" 
        alt="Submit Icon"
        width={54}
        height={0}
        onLoad={() => console.log("이미지 업로드 성공")}
        onError={() => console.error("이미지 업로드 실패")}
      />
    </Button>
  );
};

export default WriteButton;

import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const LoginButton: React.FC = () => {
  const router = useRouter();

  return (
    <Wrapper>
      <Button onClick={() => router.push('/log-in') }>로그인</Button>
    </Wrapper>
  );
};

export default LoginButton;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 300px;
  height: 48px;
  border-radius: 24px;
  background: var(--main-green);
  margin-bottom: 2rem;

  color: var(--white-from-grayscale);
  font-family: Inter;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.5px;
  text-align: center; 

  cursor: pointer;
  
  &:hover {
    background-color: var(--sub-green1);
  }
`;
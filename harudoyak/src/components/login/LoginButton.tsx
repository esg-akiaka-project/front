import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    background-color: #45A049;
  }
`;

const LoginButton: React.FC = () => {
  return <Button>로그인</Button>;
};

export default LoginButton;

import React from 'react';
import styled from 'styled-components';

const SocialWrapper = styled.div`
  text-align: center;
  margin-top: 1.5rem;
`;

const SocialTitle = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
`;

const SocialButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 0 0.5rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;

  &:first-child {
    background-color: #fff;
    color: #333;
  }

  &:last-child {
    background-color: #ffeb3b;
    color: #333;
  }
`;

const SocialLogin: React.FC = () => {
  return (
    <SocialWrapper>
      <SocialTitle>간편 로그인</SocialTitle>
      <SocialButton>Google</SocialButton>
      <SocialButton>KaKao</SocialButton>
    </SocialWrapper>
  );
};

export default SocialLogin;

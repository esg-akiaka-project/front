import React from 'react';
import styled from 'styled-components';

const SocialWrapper = styled.div`
  text-align: center;
  margin-top: 1.5rem;
`;

const SocialTitle = styled.p`
color: var(--CoolGray-90, #21272A);
text-align: center;
/* Body/M */
font-family: Roboto;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 22.4px */
`;

const SocialButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius:24px;
  border : 2px solid #19191B;
  margin: 0 0.5rem;
  cursor: pointer;
  justify-content : center;
  display: inline-flex;
  align-items: center;
  align-self: stretch;

  

  &:first-child {
    background-color: #fff;
    color: #333;
  }

  &:last-child {
    background-color: var(--background);
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

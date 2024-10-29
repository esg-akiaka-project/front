import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const LinksWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 1.5rem;
`;

const LinkText = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const LinkOptions: React.FC = () => {
  const router = useRouter();

  return (
    <LinksWrapper>
      <LinkText onClick={() => router.push('/sign-up/email-certification-and-information-regist')}>회원가입</LinkText>
      <LinkText>아이디 찾기</LinkText>
      <LinkText>비밀번호 찾기</LinkText>
    </LinksWrapper>
  );
};

export default LinkOptions;

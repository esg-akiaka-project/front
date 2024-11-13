import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const LinksWrapper = styled.div`
  display: flex;
  color: var(--gray-from-grayscale);
  justify-content: center;
  gap: 1rem;
  font-size: 14px;
  font-style: normal;
  font weight: 100;
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
      <LinkText onClick={() => router.push("/sign-up/tos-agreement")}>
        회원가입
      </LinkText>
      {/* <LinkText>아이디 찾기</LinkText> */}
      {/* todo: 비밀번호 찾기 페이지 필요 */}
      <LinkText>비밀번호 찾기 </LinkText>
    </LinksWrapper>
  );
};

export default LinkOptions;

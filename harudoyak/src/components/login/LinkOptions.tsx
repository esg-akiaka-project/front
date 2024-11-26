import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import PasswordResetModal from "./PasswordResetModal";

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
  const [isPasswordResetOpen, setIsPasswordResetOpen] =
    useState<boolean>(false);

  return (
    <>
      <LinksWrapper>
        <LinkText onClick={() => router.push("/sign-up/tos-agreement")}>
          회원가입
        </LinkText>
        {/* todo: 비밀번호 찾기 페이지 필요 */}
        <LinkText onClick={() => setIsPasswordResetOpen(true)}>
          비밀번호 찾기{" "}
        </LinkText>
      </LinksWrapper>
      <PasswordResetModal
        isOpen={isPasswordResetOpen}
        onClose={() => setIsPasswordResetOpen(false)}
      />
    </>
  );
};

export default LinkOptions;

import React from "react";
import styled from "styled-components";
import Image from "next/image";

// src와 children을 받도록 설정
interface UploadOptionBtnProps {
  src: string;
  children: React.ReactNode;
}

const UploadOptionBtn: React.FC<UploadOptionBtnProps> = ({ src, children }) => {
  return (
    <Button>
      <Image src={src} alt="" />
      <ButtonContents>{children}</ButtonContents>
    </Button>
  );
};

export default UploadOptionBtn;

const Button = styled.button`
  background: #ffffff;
  width: 49%;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left:;
`;

const ButtonContents = styled.div`
  margin-left: 8px;
  font-size: 0.75rem;
  color: var(--gray-from-grayscale);
`;

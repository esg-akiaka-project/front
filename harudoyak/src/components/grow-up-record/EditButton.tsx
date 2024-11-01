import React from "react";
import styled from "styled-components";
import Link from "next/link";

const EditButton: React.FC = () => {
  return (
    <>
      <Link href="/writing-page">
        <Button>수정</Button>
      </Link>
    </>
  );
};

export default EditButton;

const Button = styled.button`
  color: #ffffff;
  background: var(--sub-green2);
  border-radius: 10px;
  padding-right: 8px;
  padding-left: 8px;
  font-size: 0.75rem;
  height: 12%;
  text-align: center;
  transform: translateY(11px);
`;

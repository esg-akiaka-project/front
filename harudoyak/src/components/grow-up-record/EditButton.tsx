import React from "react";
import styled from "styled-components";

const EditButton: React.FC = () => {
  return (
    <>
      <Button>수정</Button>
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
  margin-top: 40px;
  text-align: center;
`;

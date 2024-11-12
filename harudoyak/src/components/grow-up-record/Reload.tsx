import React from "react";
import styled from "styled-components";

interface ReloadButtonProps {
  index: number;
  children?: React.ReactNode;
}

const ReloadButton: React.FC<ReloadButtonProps> = ({ index, children }) => {
  const handleSubmit = async () => {
    console.log("태그 다시 불러오기");
    index = index + 1;
  };

  return <Button onClick={handleSubmit}>{children}</Button>;
};

export default ReloadButton;

const Button = styled.button`
  all: unset;
  cursor: pointer;
`;

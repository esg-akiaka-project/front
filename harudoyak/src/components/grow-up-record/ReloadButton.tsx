import React from "react";
import styled from "styled-components";
import iconReload from "../../../public/assets/common/icon_reload.svg";
import Image from "next/image";

interface ReloadButtonProps {
  index: number;
}

const ReloadButton: React.FC<ReloadButtonProps> = ({ index }) => {
  const handleSubmit = async () => {
    console.log("태그 다시 불러오기");
    index = index + 1;
    console.log(index + "번째 호출");
  };

  return (
    <Button onClick={handleSubmit}>
      <Image src={iconReload} alt="Reload" />
    </Button>
  );
};

export default ReloadButton;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  top: 0;
`;

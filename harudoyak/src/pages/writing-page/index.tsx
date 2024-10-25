import React from "react";
import styled from "styled-components";
import Link from "next/link";

import TextCenterHeader from "../../components/common/Header/CenterTextHeader";

const WritingPage: React.FC = () => {
  return (
    <>
      <TextCenterHeader />
      <Input></Input>
    </>
  );
};

export default WritingPage;

// styled-component
const Input = styled.input``;

import React from "react";
import styled from "styled-components";

const Cancelitem = styled.div`
  font-weight: bold;
  margin-top: 15%;
  margin-left: 8%;
`;
const CancelButton: React.FC = () => {
  return (
    <>
      <Cancelitem>✕</Cancelitem>
    </>
  );
};

export default CancelButton;

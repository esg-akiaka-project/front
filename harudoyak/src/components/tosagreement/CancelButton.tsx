import React from "react";
import styled from "styled-components";
interface CancelButtonProps {
  onClick?: () => void;
}
const Cancelitem = styled.div`
  font-weight: bold;
  margin-top: 15%;
  margin-left: 8%;
`;
const CancelButton: React.FC<CancelButtonProps> = ({ onClick }) => {
  return (
    <>
      <Cancelitem onClick={onClick}>✕</Cancelitem>
    </>
  );
};

export default CancelButton;

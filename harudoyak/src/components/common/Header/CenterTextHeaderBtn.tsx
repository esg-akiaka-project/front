import React from "react";
import styled from "styled-components";

const CenterTextHeaderBtn: React.FC = () => {
  return (
    <>
      <Button>완료</Button>
    </>
  );
};

export default CenterTextHeaderBtn;

// styled components
const Button = styled.button`
  display: flex;
  display: flex;
  color: #ffffff;
  background-color: var(--sub-green2);
  border-radius: 20px;
  width: 15%;
  min-width: 57px;
  height: 30px;
  text-align: center;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  font-size: 0.88rem;
`;

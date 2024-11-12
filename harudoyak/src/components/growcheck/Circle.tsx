import React from "react";
import styled from "styled-components";

interface CircleProps {
  number: number;
}

const Circle: React.FC<CircleProps> = ({ number }) => {
  return <StyledCircle>{number}</StyledCircle>;
};

export default Circle;

const StyledCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3rem;
  background-color: white;
  width: 1.3rem;
  height: 1.3rem;
  font-size: 1rem;
  font-weight: bold;
  color: #3c7960;
`;

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
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  padding: 2px 8px;
  color: var(--darkgray-from-grayscale);
  margin-top: 6px;
`;

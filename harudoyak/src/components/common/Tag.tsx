import React from "react";
import styled from "styled-components";

interface TagProps {
  children: React.ReactNode;
}

const Tag: React.FC<TagProps> = ({ children }) => {
  return <StyledTag>#{children}</StyledTag>;
};

export default Tag;

const StyledTag = styled.div`
  background: #ffffff;
  border-radius: 15px;
  padding: 8px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
  color: var(--main-green);
`;

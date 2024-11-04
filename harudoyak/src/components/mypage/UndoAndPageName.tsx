import React from "react";
import UndoXButton from "../buttons/UndoXButton";
import styled from "styled-components";
import iconArrow from "@/public/assets/common/icon_arrow.svg";

interface PageNameProps {
  pageName: string;
}
const UndoAndPageName: React.FC<PageNameProps> = ({ pageName }) => {
  return (
    <>
      <UPN>
        <UndoXButton icon={iconArrow} />
        <StyledTitle>{pageName}</StyledTitle>
      </UPN>
    </>
  );
};

export default UndoAndPageName;

const UPN = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
`;

const StyledTitle = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
  color: grey;
`;

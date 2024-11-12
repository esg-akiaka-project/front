import React from "react";
import UndoXButton from "../buttons/UndoXButton";
import SpeicificUndoXButton from "../buttons/SpecificUndoXButton";
import styled from "styled-components";
import iconArrow from "@/public/assets/common/icon_arrow.svg";

interface PageNameProps {
  pageName: string;
}
const UndoAndPageName: React.FC<PageNameProps> = ({ pageName }) => {
  const isMaintainPage = pageName === "계정관리";
  return (
    <>
      <UPN>
        {isMaintainPage ? (
          <SpeicificUndoXButton icon={iconArrow} />
        ) : (
          <UndoXButton icon={iconArrow} />
        )}
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

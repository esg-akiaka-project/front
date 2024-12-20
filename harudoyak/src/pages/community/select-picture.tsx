// SelectPicture.tsx
import React from "react";
import styled from "styled-components";
import { Header } from "../../components/community/Header";
import { CancelNextBar } from "../../components/community/CancelNextBar";
import { PhotoGrid } from "../../components/community/PhotoGrid";
import { MainPhoto } from "../../components/community/MainPhoto";
import Root from "../../style/Root";
import useCommunityStore from "../../store/useCommunityStore";
import { editPost } from "@/src/apis/seoroApi";

const SelectPicture: React.FC = () => {
  const { selectedPhoto, setSelectedPhoto } = useCommunityStore();

  return (
    <Root>
      <Header />
      <Heading1></Heading1>
      <CancelNextBar />
      <MainPhoto selectedPhoto={selectedPhoto} />
      <PhotoGrid setSelectedPhoto={setSelectedPhoto} />
    </Root>
  );
};

export default SelectPicture;

const Heading1 = styled.h1`
  font-size: 1.44rem;
  color: var(--main-green);
  margin-bottom: 4px;
`;

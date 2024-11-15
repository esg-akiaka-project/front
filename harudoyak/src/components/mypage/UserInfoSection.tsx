import React from "react";
import Avatar from "../Avatar";
import MyAiName from "./MyAiName";
import MyName from "./MyName";
import MyLevel from "./MyLevel";
import styled from "styled-components";

const UserInfoSection: React.FC = () => {
  return (
    <Sectiondiv>
      <AvatarWrapper>
        <Avatar />
      </AvatarWrapper>
      <Namediv>
        <MyName />
        <MyAiName />
      </Namediv>
      <MyLevelWrapper>
        <MyLevel />
      </MyLevelWrapper>
    </Sectiondiv>
  );
};
export default UserInfoSection;

const Sectiondiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin: 1rem;
`;

const AvatarWrapper = styled.div`
  width: 70px;
  height: 70px;
  overflow: hidden;
  border-radius: 50%;
`;

const Namediv = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 0.4;
  width: 35%;
`;

const MyLevelWrapper = styled.div`
  margin-left: 3rem;
  font-weight: bold;
`;

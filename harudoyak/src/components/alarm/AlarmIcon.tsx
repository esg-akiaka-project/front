import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import messageIcon from "../../Images/messageIcon.png";

const Icon = styled.div<{ isClicked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  opacity: ${(props) => (props.isClicked ? 0.3 : 0.8)};
`;

const AlarmIcon: React.FC<{ isClicked: boolean }> = ({ isClicked }) => {
  return (
    <Icon isClicked={isClicked}>
      <Image src={messageIcon} alt="message Icon" width={80} height={80} />
    </Icon>
  );
};

export default AlarmIcon;
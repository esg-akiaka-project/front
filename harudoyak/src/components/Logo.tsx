import React from 'react';
import styled from 'styled-components';

const LogoText = styled.h1`
color: var(--CoolGray-90, #21272A);
text-align: center;
/* Heading/3 */
font-family: Roboto;
font-size: 32px;
font-style: normal;
font-weight: 700;
line-height: 110%; /* 35.2px */
margin-top: 146px;
`;

const Logo: React.FC = () => {
  return <LogoText>하루 도약 로고</LogoText>;
};

export default Logo;

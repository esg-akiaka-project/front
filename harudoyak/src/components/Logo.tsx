import React from 'react';
import styled from 'styled-components';

const LogoText = styled.h1`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 2rem;
`;

const Logo: React.FC = () => {
  return <LogoText>하루 도약 로고</LogoText>;
};

export default Logo;

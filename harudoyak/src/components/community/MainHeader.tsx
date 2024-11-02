// components/community/MainHeader.tsx
import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px; /* Header와 CancelNextBar의 높이 합산 */
  background-color: var(--main-green);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: white;
`;

const MainHeader: React.FC = () => {
  return (
    <HeaderWrapper>
      <Title>서로도약</Title>
    </HeaderWrapper>
  );
};

export default MainHeader;

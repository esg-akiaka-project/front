// components/community/MainHeader.tsx
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

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
  cursor: pointer; /* 클릭 가능하도록 커서 변경 */
`;

const MainHeader: React.FC = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/community#top'); // 최상단 게시글로 이동
  };

  return (
    <HeaderWrapper>
      <Title onClick={handleLogoClick}>서로도약</Title>
    </HeaderWrapper>
  );
};

export default MainHeader;

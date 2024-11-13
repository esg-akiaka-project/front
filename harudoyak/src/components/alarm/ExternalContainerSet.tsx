import React from 'react';
import styled from 'styled-components';

const ExternalContainer = styled.div`
  max-width: 390px;
  height: 100%;
  margin: 0 auto;
  padding: 15px;
  background-color: #F2F6F3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: "Inter", sans-serif;
  letter-spacing: -1px;
`;

const ExternalContainerSet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ExternalContainer>{children}</ExternalContainer>;
};

export default ExternalContainerSet;

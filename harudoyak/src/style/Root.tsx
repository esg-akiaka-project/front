import React from "react";
import styled from "styled-components";

const Root: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default Root;

const Layout = styled.div`
  min-height: 80vh;
  padding: 0;
  max-width: 1100px;
  margin-top: 63px;

  @media screen and (max-width: 768px) {
    margin-left: 1.44rem;
    margin-right: 1.44rem;
  }

  @media screen and (min-width: 768px) {
    margin-left: 1.44rem;
    margin-right: 1.44rem;
  }
`;

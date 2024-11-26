// src/components/community/DoyakObject.tsx
import React from "react";
import styled from "styled-components";

const DoyakObjectContainer = styled.div`
  font-size: 0.75rem !important; /* 폰트 사이즈 줄임 */
  color: # !important; /* 색깔을 흰색으로 변경 */
  margin-bottom: 5px !important;
`;

interface ObjectProps {
  object: string;
}
const DoyakObject: React.FC<ObjectProps> = ({ object }) => {
  return <DoyakObjectContainer>#{object}</DoyakObjectContainer>;
};

export default DoyakObject;

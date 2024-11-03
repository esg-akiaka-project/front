// src/components/community/DoyakObject.tsx
import React from 'react';
import styled from 'styled-components';

const DoyakObjectContainer = styled.div`
    font-size: 0.6rem !important; /* 폰트 사이즈 줄임 */
    color: # !important; /* 색깔을 흰색으로 변경 */
    margin-bottom: 5px !important;
`;

const DoyakObject: React.FC = () => {
    return <DoyakObjectContainer>#도약목표</DoyakObjectContainer>;
};

export default DoyakObject;



import React from 'react';
import styled from 'styled-components';

const Line = styled.hr`
    width: 100%;
    height: 1px;
    background-color: #DDE1E6;
    border: none;
    margin: 16px 0;
`;

const Separator: React.FC = () => {
    return <Line />;
};

export default Separator;

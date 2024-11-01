import React from 'react';
import styled from 'styled-components';

const Line = styled.hr`
    width: 100%;
    height: var(--Spacing-0px, 1px);

    background: #DDE1E6;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Separator: React.FC = () => {
    return <Line />;
};

export default Separator;
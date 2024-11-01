import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const BarContainer = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    width: 100%;
    padding: 0 16px;
`;

const Button = styled.button`
    font-size: 15px;
`;

export const CancelBar: React.FC = () => {
    const router = useRouter();

    const handleBack = () => {
        router.push('/community/select-picture');
    };

    return (
        <BarContainer>
            <Button onClick={handleBack}>이전</Button>
        </BarContainer>
    );
};

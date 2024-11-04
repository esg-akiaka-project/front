import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const BarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 20px;
`;

const Button = styled.button`
    color: #000;
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px; /* 161.538% */
    letter-spacing: -0.33px;
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

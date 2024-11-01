import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const CancelNextBarContainer = styled.div`
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

export const CancelNextBar: React.FC = () => {
    const router = useRouter();

    return (
        <CancelNextBarContainer>
            <Button onClick={() => router.push('/community')}>취소</Button>
            <Button onClick={() => router.push('/community/select-comment')}>다음</Button>
            
        </CancelNextBarContainer>
    );
};

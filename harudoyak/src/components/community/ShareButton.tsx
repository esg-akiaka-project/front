import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Button = styled.button`
    width: 100%;
    height : 30px;
    font-size: 16px;
    color: white;
    background-color: #28a745;
    border: none;
    border-radius: 24px;
    cursor: pointer;
    text-align: center;
`;

export const ShareButton: React.FC = () => {
    const router = useRouter();

    const handleShare = () => {
        // community 메인 페이지로 라우트
        router.push('/community');
    };

    return <Button onClick={handleShare}>공유하세요!</Button>;
};

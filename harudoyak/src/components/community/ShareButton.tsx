import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Button = styled.button`
    width: 90%;
    height: 30px;
    font-size: 16px;
    color: white;
    background-color: var(--sub-green3);
    border: none;
    border-radius: 24px;
    cursor: pointer;
    justify-content: center;
    text-align: center;
    margin: 0 auto; /* 버튼을 중앙에 배치 */
    display: block; /* 중앙 정렬을 위해 display 속성 추가 */
`;

export const ShareButton: React.FC = () => {
    const router = useRouter();

    const handleShare = () => {
        // community 메인 페이지로 라우트
        router.push('/community');
    };

    return <Button onClick={handleShare}>공유하세요!</Button>;
};

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0; /* Ensure no margin is affecting the centering */
`;

const Button = styled.button`
    width: 90%;
    max-width: 300px; /* 버튼의 최대 너비 설정 */
    height: 40px;
    font-size: 16px;
    color: white;
    background-color: var(--sub-green3);
    border: none;
    border-radius: 24px;
    cursor: pointer;
    display: inline-flex; /* 아이콘과 텍스트를 나란히 배치 */
    align-items: center; /* 아이콘과 텍스트를 수직으로 중앙 정렬 */
    justify-content: center;
    text-align: center;
`;

const IconWrapper = styled.div`
    width: 20px;
    height: 20px;
    margin-right: 8px;
`;

export const ShareButton: React.FC = () => {
    const router = useRouter();

    const handleShare = () => {
        // community 메인 페이지로 라우트
        router.push('/community');
    };

    return (
        <ButtonContainer>
            <Button onClick={handleShare}>
                <IconWrapper>
                    <Image src="/assets/community/sharebutton.svg" alt="Share Icon" width={20} height={20} />
                </IconWrapper>
                공유하세요!
            </Button>
        </ButtonContainer>
    );
};

// ShareButton.tsx
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
`;

const Button = styled.button`
    width: 90%;
    max-width: 300px;
    height: 40px;
    font-size: 16px;
    color: white;
    background-color: var(--sub-green3);
    border: none;
    border-radius: 24px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const IconWrapper = styled.div`
    width: 20px;
    height: 20px;
    margin-right: 8px;
`;

interface ShareButtonProps {
    onClick?: () => void;
}

const ShareButton: React.FC<ShareButtonProps> = ({ onClick }) => {
    const router = useRouter();

    const handleShare = () => {
        if (onClick) onClick();
        router.push('/community'); // communityhome으로 라우팅
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

export default ShareButton;

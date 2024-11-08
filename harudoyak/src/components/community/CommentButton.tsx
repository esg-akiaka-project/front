// src/components/community/CommentButton.tsx
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import useCommunityStore from '../../store/useCommunityStore'; // 상태 가져오기

interface CommentButtonProps {
    onClick: () => void;
}

const CommentButton: React.FC<CommentButtonProps> = ({ onClick }) => {
    return (
        <Button onClick={onClick}>
            <IconWrapper>
                <Image src="/assets/community/commentbutton.svg" alt="Comment Icon" width={25} height={23} />
            </IconWrapper>
        </Button>
    );
};

export default CommentButton;

const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    outline: none;
    margin-left: 10px;
`;

const IconWrapper = styled.div`
    width: 25px;
    height: 23px;
    margin-right: 8px;
`;

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import useCommunityStore from '../../store/useCommunityStore';

const Doyak: React.FC = () => {
    const { doyakCount, incrementDoyakCount, decrementDoyakCount } = useCommunityStore();

    const handleClick = () => {
        if (doyakCount === 0) {
            incrementDoyakCount();
        } else {
            decrementDoyakCount();
        }
    };

    return (
        <Button onClick={handleClick}>
            <IconWrapper>
                <Image src="/assets/community/doyak.svg" alt="Doyak Icon" width={25} height={23} />
            </IconWrapper>
        </Button>
    );
};

export default Doyak;

const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    outline: none;
`;

const IconWrapper = styled.div`
    width: 25px;
    height: 23px;
    margin-right: 8px;
`;

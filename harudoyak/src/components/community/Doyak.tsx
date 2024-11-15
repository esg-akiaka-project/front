import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface DoyakProps {
    doyakCount: number;
    onDoyakClick: () => void;
}

const Doyak: React.FC<DoyakProps> = ({ doyakCount, onDoyakClick }) => {
    return (
        <Button onClick={onDoyakClick}>
            <IconWrapper>
                <Image src="/assets/community/doyak.svg" alt="Doyak Icon" width={25} height={23} />
            </IconWrapper>
            <div>{doyakCount}</div>
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

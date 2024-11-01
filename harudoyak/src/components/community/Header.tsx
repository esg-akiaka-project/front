import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 0px;
`;

const Button = styled.button`
    font-size: 16px;
`;

const Title = styled.h1`
   width: 68px;
   height: 22px;
   flex-shrink: 0;
   color: #000;

   text-align: center;
   font-family: Inter;
   font-size: 15px;
   font-style: normal;
   font-weight: 400;
   line-height: 21px; /* 140% */
   letter-spacing: -0.33px;
`;


export const Header: React.FC = () => {

    return (
        <HeaderContainer>
            <Title>새 게시물</Title>
        </HeaderContainer>
    );
};

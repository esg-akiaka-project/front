import React from 'react';
import styled from 'styled-components';

const TextBox = styled.div`
    width: 100%;
    padding: 12px;
    font-size: 10px;
    color: #555;
    background-color: #f9f9f9;
    border-radius: 4px;
    margin-bottom: 16px;
`;

export const ExampleTextBox: React.FC = () => {
    return (
        <TextBox>
            작성 예시) 금요일이 오면 이제 토요일이잖아~ 완전 럭키비키잖아!
        </TextBox>
    );
};

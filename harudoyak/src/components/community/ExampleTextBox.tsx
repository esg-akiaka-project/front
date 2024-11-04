import React from 'react';
import styled from 'styled-components';

const TextBox = styled.div`
    width: 100%;
    padding: 12px;
    font-family:Inter;
    font-style:normal;
    font-size: 10px;
    font-weight: 400;
    line-height:normal;
    color: var(--gray-from-grayscale);
    background-color: #f9f9f9;
    border-radius: 4px;
    margin-bottom: 16px;
`;

export const ExampleTextBox: React.FC = () => {
    return (
        <TextBox>
            작성 예시) 
            오늘 회사에서 실수도 많고 마음이 무거웠는데, 누군가에게 이런 따뜻한 조언을 받았어요. 실수도 성장 과정의 일부라고 말해주니 마음이 조금 가벼워졌네요. 덕분에 자신감을 다시 되찾은 것 같아요! 아직 많이 부족하지만, 조금씩 성장해나가고 싶어요. 이런 말을 들으니 정말 큰 힘이 되네요. 같은 길을 걷는 다른 초년생 분들도 힘내셨으면 좋겠습니다! 😊
        </TextBox>
    );
};

import React from 'react';
import styled from 'styled-components';

const PhotoContainer = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
`;

const Photo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const SelectedPhoto: React.FC = () => {
    // 실제로는 이전 페이지에서 선택한 사진을 props로 받아서 표시하도록 구현할 수 있습니다.
    return (
        <PhotoContainer>
            <Photo src="/path/to/selected-photo.jpg" alt="Selected" />
        </PhotoContainer>
    );
};

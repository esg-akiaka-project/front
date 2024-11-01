import React from 'react';
import styled from 'styled-components';

interface MainPhotoProps {
    selectedPhoto: string | null;
}

const MainPhotoContainer = styled.div`
    width: 100%;
    height: 339px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--gray-from-grayscale);
`;

const Photo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const MainPhoto: React.FC<MainPhotoProps> = ({ selectedPhoto }) => {
    return (
        <MainPhotoContainer>
            {selectedPhoto ? (
                <Photo src={selectedPhoto} alt="Selected" />
            ) : (
                <p>가장 최근에 찍은 사진이 여기에 표시됩니다.</p>
            )}
        </MainPhotoContainer>
    );
};

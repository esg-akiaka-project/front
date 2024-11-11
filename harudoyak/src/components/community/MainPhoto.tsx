import React from 'react';
import styled from 'styled-components';

interface MainPhotoProps {
    selectedPhoto: File | string | null;
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
    const getPhotoSrc = (photo: File | string | null): string | undefined => {
        if (photo instanceof File) {
            return URL.createObjectURL(photo);
        } else if (typeof photo === 'string') {
            return photo;
        }
        return undefined;
    };

    const photoSrc = getPhotoSrc(selectedPhoto);

    return (
        <MainPhotoContainer>
            {photoSrc ? (
                <Photo src={photoSrc} alt="Selected" />
            ) : (
                <p>아래의 첨부된 사진에서 선택하면 표시됩니다.</p>
            )}
        </MainPhotoContainer>
    );
};

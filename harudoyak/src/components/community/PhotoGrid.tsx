import React, { useState } from 'react';
import styled from 'styled-components';
import Thumbnail from './Thumbnail'; // Thumbnail 컴포넌트를 import 합니다.

const PhotoGridContainer = styled.div`
    position: relative;
    width: 100%;
    max-height: 300px;
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: var(--sub-green3) transparent;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--sub-green3);
        border-radius: 10px;
    }
`;

const SelectBox = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
    background-color: var(--sub-green3);
    border-radius: 20px;
    font-style: normal;
    text-transform: uppercase;
    font-family: Inter;
    font-size: 11px;
    color: var(--white-from-grayscale);
    z-index: 1;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); // 한 줄에 3개의 그리드
    grid-auto-rows: minmax(100px, auto); // 각 그리드의 높이 설정
    gap: 10px;
    padding-top: 30px;
`;

const FileInput = styled.input`
    display: none;
`;

const Label = styled.label`
    display: inline-block;
    padding: 8px 16px;
    background-color: var(--main-green);
    color: white;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 16px;
`;

interface PhotoGridProps {
    setSelectedPhoto: (photo: string | null) => void;
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ setSelectedPhoto }) => {
    const [photos, setPhotos] = useState<string[]>([]);
    const [selectedPhoto, setSelectedPhotoState] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
            setPhotos(prevPhotos => {
                const uniquePhotos = newPhotos.filter(photo => !prevPhotos.includes(photo));
                return [...prevPhotos, ...uniquePhotos];
            });
        }
    };

    const handlePhotoClick = (photo: string) => {
        setSelectedPhoto(photo);
        setSelectedPhotoState(photo);
    };

    return (
        <PhotoGridContainer>
            <SelectBox>사진 한 개 선택</SelectBox>
            <Label htmlFor="file-input">사진 업로드</Label>
            <FileInput
                id="file-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
            />
            <Grid>
                {photos.map((photo, index) => (
                    <Thumbnail
                        key={index}
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        isSelected={selectedPhoto === photo}
                        onClick={() => handlePhotoClick(photo)}
                    />
                ))}
            </Grid>
        </PhotoGridContainer>
    );
};

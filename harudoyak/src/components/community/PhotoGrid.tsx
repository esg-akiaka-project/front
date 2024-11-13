import React from 'react';
import styled from 'styled-components';
import Thumbnail from './Thumbnail';
import useCommunityStore from '../../store/useCommunityStore';

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
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(100px, auto);
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
    setSelectedPhoto: (photo: string | null) => void; // 수정된 부분
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ setSelectedPhoto }) => {
    const { photos, addPhotos } = useCommunityStore();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
            addPhotos(newPhotos); // 새로운 사진 배열을 상단에 추가
        }
    };

    const handlePhotoClick = (photo: string) => { // 수정된 부분
        setSelectedPhoto(photo);
    };

    return (
        <PhotoGridContainer>
            <SelectBox>사진 한 장을 선택해주세요!</SelectBox>
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
                        isSelected={photos.includes(photo)}
                        onClick={() => handlePhotoClick(photo)}
                    />
                ))}
            </Grid>
        </PhotoGridContainer>
    );
};


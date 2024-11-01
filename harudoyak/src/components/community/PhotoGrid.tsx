import React from 'react';
import styled from 'styled-components';

interface PhotoGridProps {
    setSelectedPhoto: (photo: string) => void;
}

const PhotoGridContainer = styled.div`
    position: relative;
    width: 100%;
    max-height: 200px;
    overflow-y: scroll;
`;

const SelectBox = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
    background-color: var(--sub-green3);
    border-radius : 20px;
    font-style: normal;
    text-transform: uppercase;
    font-family: Inter;
    font-size: 11px;
    color: var(--white-from-grayscale);
    z-index: 1;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    padding-top: 30px;
`;

const Thumbnail = styled.img`
    width: 100%;
    height: 75px;
    object-fit: cover;
    cursor: pointer;
`;

export const PhotoGrid: React.FC<PhotoGridProps> = ({ setSelectedPhoto }) => {
    const photos = [
        // 예시 데이터 - 실제로는 유저의 사진첩 데이터를 가져와야 합니다.
        '/path/to/photo1.jpg',
        '/path/to/photo2.jpg',
        '/path/to/photo3.jpg',
        '/path/to/photo4.jpg',
        '/path/to/photo5.jpg',
    ];

    return (
        <PhotoGridContainer>
            <SelectBox>사진 한 개 선택</SelectBox>
            <Grid>
                {photos.map((photo, index) => (
                    <Thumbnail
                        key={index}
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        onClick={() => setSelectedPhoto(photo)}
                    />
                ))}
            </Grid>
        </PhotoGridContainer>
    );
};

// components/community/Thumbnail.tsx
import React from 'react';
import styled from 'styled-components';

interface ThumbnailProps {
    src: string;
    alt: string;
    isSelected: boolean;
    onClick: () => void;
}

const ThumbnailImage = styled.img<ThumbnailProps>`
    width: 100%;
    height: 75px;
    object-fit: cover;
    cursor: pointer;
    border: ${({ isSelected }) => (isSelected ? '2px solid var(--main-green)' : 'none')};
    opacity: ${({ isSelected }) => (isSelected ? 0.7 : 1)};
`;

const Thumbnail: React.FC<ThumbnailProps> = ({ src, alt, isSelected, onClick }) => {
    return <ThumbnailImage src={src} alt={alt} isSelected={isSelected} onClick={onClick} />;
};

export default Thumbnail;

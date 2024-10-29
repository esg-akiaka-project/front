import React, { useState } from 'react';
import styled from 'styled-components';
import { Header } from '../../components/community/Header';
import { PhotoGrid } from '../../components/community/PhotoGrid';
import { MainPhoto } from '../../components/community/MainPhoto';
import Root from "../../style/Root";


const selectpicture: React.FC = () => {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    return (
        <Root>
            <Header />
            <MainPhoto selectedPhoto={selectedPhoto} />
            <PhotoGrid setSelectedPhoto={setSelectedPhoto} />
        </Root>
    );
};

export default selectpicture;

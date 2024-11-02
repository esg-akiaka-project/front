// SelectCommentPage.tsx
import React, { useState } from 'react';
import { Header } from '../../components/community/Header';
import { CancelBar } from '../../components/community/CancelBar';
import { MainPhoto } from '../../components/community/MainPhoto';
import { CommentInput } from '../../components/community/CommentInput';
import { ExampleTextBox } from '../../components/community/ExampleTextBox';
import ShareButton from '../../components/community/ShareButton';
import styled from 'styled-components';
import Root from '../../style/Root';
import useCommunityStore from '../../store/useCommunityStore';

const SelectCommentPage: React.FC = () => {
    const { selectedPhoto, comment, setComment, addPost } = useCommunityStore();

    const handleShare = () => {
        addPost();
        alert('게시글이 저장되었습니다!');
    };

    return (
        <Root>
            <Header />
            <Heading1></Heading1>
            <CancelBar />
            <MainPhoto selectedPhoto={selectedPhoto} />
            <CommentInput comment={comment} setComment={setComment} />
            <ExampleTextBox />
            <ShareButton onClick={handleShare} />
        </Root>
    );
};

export default SelectCommentPage;

const Heading1 = styled.h1`
  font-size: 1.44rem;
  color: var(--main-green);
  margin-bottom: 10px;
`;

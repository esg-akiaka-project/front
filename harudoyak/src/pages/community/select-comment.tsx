import React, { useState } from 'react';
import { Header } from '../../components/community/Header';
import { CancelBar } from '../../components/community/CancelBar';
import { MainPhoto } from '../../components/community/MainPhoto';
import { CommentInput } from '../../components/community/CommentInput';
import { ExampleTextBox } from '../../components/community/ExampleTextBox';
import { ShareButton } from '../../components/community/ShareButton';
import styled from 'styled-components';
import Root from '../../style/Root';

const SelectCommentPage: React.FC = () => {
    const [comment, setComment] = useState("");
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null); // 선택한 사진의 URL 또는 경로

    return (
        <Root>
            <Header />
            <Heading1></Heading1>
            <CancelBar />
            <MainPhoto selectedPhoto={selectedPhoto} /> {/* selectedPhoto 속성 추가 */}
            <Heading3></Heading3>
            <CommentInput comment={comment} setComment={setComment} />
            <Heading2></Heading2>
            <ExampleTextBox />
            <ShareButton />
        </Root>
    );
};

export default SelectCommentPage;

const Heading1 = styled.h1`
  font-size: 1.44rem;
  color: var(--main-green);
  margin-bottom: 10px;
`;
const Heading2 = styled.h2`
  font-size: 1.56rem;
  color: var(--sub-green2);
  margin-bottom: 2px;
  margin-top: 2px;
`;

const Heading3 = styled.h3`
  font-size: 1.56rem;
  color: var(--sub-green2);
  margin-bottom: 2px;
  margin-top: 2px;
`;

const Heading4 = styled.h4`
  font-size: 1.56rem;
  color: var(--sub-green2);
  margin-bottom: 12px;
  margin-top: 14px;
`;

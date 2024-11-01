import React, { useState } from 'react';
import { Header } from '../../components/community/Header';
import { CancelBar } from '../../components/community/CancelBar';
import { SelectedPhoto } from '../../components/community/SelectedPhoto';
import { CommentInput } from '../../components/community/CommentInput';
import { ExampleTextBox } from '../../components/community/ExampleTextBox';
import { ShareButton } from '../../components/community/ShareButton';
import styled from 'styled-components';
import Root from '../../style/Root';



const SelectCommentPage: React.FC = () => {
    const [comment, setComment] = useState("");

    return (
        <Root>
            <Header />
            <Heading1></Heading1>
            <CancelBar />
            <SelectedPhoto />
            <CommentInput comment={comment} setComment={setComment} />
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
  margin-bottom: 12px;
  margin-top: 41px;
`;

const Heading3 = styled.h3`
  font-size: 1.56rem;
  color: var(--sub-green2);
  margin-bottom: 12px;
  margin-top: 28px;
`;

const Heading4 = styled.h4`
  font-size: 1.56rem;
  color: var(--sub-green2);
  margin-bottom: 12px;
  margin-top: 14px;
`;


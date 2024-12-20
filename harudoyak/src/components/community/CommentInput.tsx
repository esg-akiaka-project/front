import React from 'react';
import styled from 'styled-components';

interface CommentInputProps {
    comment: string;
    setComment: (comment: string) => void;
}

const InputContainer = styled.div`
    width: 100%;
    height: 130px;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 130px;
    padding: 8px;
    font-family: Inter;
    font-size: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: none;
`;

export const CommentInput: React.FC<CommentInputProps> = ({ comment, setComment }) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length <= 200) {
            setComment(e.target.value);
        }
    };

    return (
        <InputContainer>
            <TextArea
                value={comment}
                onChange={handleChange}
                placeholder="문구를 작성하세요...(최대 200자 이내)"
                maxLength={200}
            />
        </InputContainer>
    );
};

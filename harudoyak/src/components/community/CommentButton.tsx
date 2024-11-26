// src/components/community/CommentButton.tsx
import React from "react";
import styled from "styled-components";
import Image from "next/image";
//import useCommunityStore from '../../store/useCommunityStore'; // 상태 가져오기

interface CommentButtonProps {
  onClick: () => void;
}

const CommentButton: React.FC<CommentButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <IconWrapper>
        <Image
          src="/assets/community/commentbutton.svg"
          alt="Comment Icon"
          width={20}
          height={20}
        />
      </IconWrapper>
    </Button>
  );
};

export default CommentButton;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  outline: none;
  margin-left: 10px;
`;

const IconWrapper = styled.div`
  margin-right: 10px;
  margin-left: 16px;
`;

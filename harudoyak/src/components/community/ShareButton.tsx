// src/components/community/ShareButton.tsx
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import useCommunityStore from '../../store/useCommunityStore';

interface ShareButtonProps {
  onClick?: () => void;
}

const ShareButton: React.FC<ShareButtonProps> = ({ onClick }) => {
  const { selectedPhoto, memberId } = useCommunityStore();
  const router = useRouter();

  const handleShare = async () => {
    try {
      const formData = new FormData();
      formData.append('memberId', memberId || '');
      formData.append('photo', selectedPhoto || '');
      console.log(formData);
      console.log(selectedPhoto);
      // await axios.post('/api/community/post', formData);

      // 라우팅 추가
      router.push('/community');
    } catch (error) {
      console.error("게시글 작성 오류:", error);
    }
  };

  return (
    <ButtonContainer>
      <Button onClick={onClick || handleShare}>
        <IconWrapper>
          <Image src="/assets/community/sharebutton.svg" alt="Share Icon" width={20} height={20} />
        </IconWrapper>
        공유하세요!
      </Button>
    </ButtonContainer>
  );
};

export default ShareButton;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
`;

const Button = styled.button`
    width: 90%;
    max-width: 300px;
    height: 40px;
    font-size: 16px;
    color: white;
    background-color: var(--sub-green3);
    border: none;
    border-radius: 24px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const IconWrapper = styled.div`
    width: 20px;
    height: 20px;
    margin-right: 8px;
`;

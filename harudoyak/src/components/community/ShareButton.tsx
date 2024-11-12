import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useCommunityStore from '../../store/useCommunityStore';
import { createPost } from '@/src/apis/seoroApi'; // createPost 함수 임포트

interface ShareButtonProps {
  onClick?: () => void;
}

const ShareButton: React.FC<ShareButtonProps> = ({ onClick }) => {
  const { selectedPhoto, comment } = useCommunityStore(); // comment 추가
  const router = useRouter();

  const handleShare = async () => {
    try {
      if (selectedPhoto && comment) { // 선택된 사진과 댓글이 있는지 확인
        await createPost(comment, selectedPhoto); // createPost 호출 시 인수 순서 수정
        router.push('/community'); // 성공 시 라우팅
      } else {
        console.error("사진 또는 댓글이 누락되었습니다.");
      }
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

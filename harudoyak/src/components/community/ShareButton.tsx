import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useCommunityStore from '../../store/useCommunityStore';
import { createPost } from '@/src/apis/seoroApi';
import { uploadToS3Seoro } from '@/src/apis/uploadToS3Seoro';

interface ShareButtonProps {
  onClick?: () => void;
}

const ShareButton: React.FC<ShareButtonProps> = ({ onClick }) => {
  const { selectedPhoto, comment } = useCommunityStore();
  const router = useRouter();

  const handleShare = async () => { 
    try { 
      console.log(comment, selectedPhoto); 
      if (selectedPhoto && comment) { 
        // 선택된 사진을 URL로 가져오고 blob으로 변환
        const response = await fetch(selectedPhoto.toString()); 
        const blob = await response.blob();
        const file = new File([blob], 'photo.jpg', { type: blob.type });
    
        // 파일 유효성 검사
        if (!file || !file.name || file.size === 0 || !file.type.startsWith('image/')) {
          throw new Error("유효하지 않은 파일입니다. in sharebutton.tsx");
        }
    
        // S3에 파일 업로드
        const uploadedUrl = await uploadToS3Seoro(file); // File을 전달하여 S3에 업로드
    
        console.log('Uploaded URL:', uploadedUrl);
    
        // 게시글 생성 - URL과 comment를 사용하여 생성
        await createPost(comment, uploadedUrl); // 이때, URL을 전달
        router.push('/community'); // 성공 시 라우팅
      } else {
        console.error("사진 또는 댓글이 누락되었습니다.");
      }
    } catch (error) {
      console.error("게시글 작성 오류///셰어버튼:", error);
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

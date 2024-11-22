import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import useCommunityStore from '../../store/useCommunityStore';

const EditCancelNextBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20px;
`;

const EditButton = styled.button`
  color: #000;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: -0.33px;
`;

interface EditCancelNextBarProps {
    onNext: () => void;
}

export const EditCancelNextBar: React.FC<EditCancelNextBarProps> = ({ onNext}) => {
  const router = useRouter();
  const { clearTemporaryData, selectedPhoto } = useCommunityStore();

  const handleCancel = () => {
    if (confirm("정말 취소하시겠습니까? 작성하신 내용은 저장되지 않습니다.")) {
      clearTemporaryData();
      router.push('/community');
    }
  };

  return (
    <EditCancelNextBarContainer>
      <EditButton onClick={handleCancel}>취소</EditButton>
      <EditButton onClick={onNext}>다음</EditButton>
    </EditCancelNextBarContainer>
  );
};

// 컴포넌트 이름: WritingEntryButton
// 컴포넌트 설명: '도약기록 쓰기' fixed 버튼
// 주 사용처: 홈 화면, 도약기록 확인 탭의 하단 '도약기록 쓰기'버튼

// Dev Log
// 최초 작성일/작성자: 2024.11.01./루이

import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import iconPencil from "../../../public/assets/common/icon_pencil.svg";

const WritingEntryButton: React.FC = () => {
  const router = useRouter();

  return (
    <ButtonLayout>
      <button type="button" onClick={() => router.push('/grow-up-record')}>
        <ContentWrapper>
          <Image src={iconPencil} alt="도약기록 쓰기 아이콘" />
          <Text>도약기록 쓰기</Text>
        </ContentWrapper>
      </button>
    </ButtonLayout>
  );
};

export default WritingEntryButton;

const ButtonLayout = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  
`;

const ContentWrapper = styled.div`
  display: flex;
  background-color: var(--main-green);
  padding: 10px 15px;
  border-radius: 55px;
  border: 1px solid #ccc;
  gap: 6px;
  align-items: center;
`;

const Text = styled.p`
  font-size: 0.94rem;
  font-weight: bold;
  color: #ffffff;
  padding: 0px;
  margin: 0px;
`;

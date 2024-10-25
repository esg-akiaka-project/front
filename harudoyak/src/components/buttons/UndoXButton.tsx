// 컴포넌트 이름: UndoXButton
// 컴포넌트 설명: 'X' 모양 버튼
// 주 사용처: 도약 기록하기 상단, 전체 페이지 내 X 모양의 undo 아이콘에 사용 가능 
// 최초 작성자: 루이

import { useRouter } from 'next/router';
import iconX from "../../../public/assets/grow-up-record/icon_X.svg";
import Image from "next/image";

const UndoXButton: React.FC = () => {
  const router = useRouter()

  return (
    <>
      <button type="button" onClick={() => router.back()}>
        <Image src={iconX} alt="닫기" />
      </button>
    </>
  );
};

export default UndoXButton;

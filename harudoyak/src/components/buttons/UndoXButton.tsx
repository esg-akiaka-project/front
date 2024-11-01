// 컴포넌트 이름: UndoXButton
// 컴포넌트 설명: 'X' 모양 버튼
// 주 사용처: 도약 기록하기 상단, 전체 페이지 내 X 모양의 undo 아이콘에 사용 가능

// Dev Log
// 최초 작성일/작성자: 2024.10.25./루이
// 수정일/작성자: 2024.10.30/카일
// 마이페이지의 경우 UndoX와 같은 기능을 쓰나 '<' 이미지를 사용해서
// 같은 기능을 가진 컴포넌트를 두개 만들지 않고 props로 이미지만 바꿀 수 있게 수정했습니다.
// <UndoXButton icon={이미지}/> 이런식으로 사용하시면 됩니다.

import { useRouter } from "next/router";
import Image from "next/image";

interface UndoButtonProps {
  icon: string;
  altText?: string;
}

const UndoXButton: React.FC<UndoButtonProps> = ({ icon, altText = "닫기" }) => {
  const router = useRouter();

  return (
    <>
      <button type="button" onClick={() => router.back()}>
        <Image src={icon} alt={altText} />
      </button>
    </>
  );
};

export default UndoXButton;

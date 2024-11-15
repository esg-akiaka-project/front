// 컴포넌트 이름: UndoXButton
// 컴포넌트 설명: 'X' 모양 버튼
// 주 사용처: 도약 기록하기 상단, 전체 페이지 내 X 모양의 undo 아이콘에 사용 가능

// Dev Log
// 최초 작성일/작성자: 2024.10.25./루이

// 1차 수정일/작성자: 2024.10.30/카일
// 마이페이지의 경우 UndoX와 같은 기능을 쓰나 '<' 이미지를 사용해서
// 같은 기능을 가진 컴포넌트를 두개 만들지 않고 props로 이미지만 바꿀 수 있게 수정했습니다.
// <UndoXButton icon={이미지}/> 이런식으로 사용하시면 됩니다.

// 2차 수정일/작성자: 2024.11.15/루이
// 이전 페이지로 하면 가끔 원하지 않은 곳으로 가게 되는 경우가 있어서 path props를 추가하였습니다.
// 이전 페이지로 돌아가게 하고 싶은 경우, 똑같이 <UndoXButton icon={이미지}/>라고 작성해 주시면 되고,
// 특정한 경로로 지정하고 싶을 경우에는, <UndoXButton icon={이미지} path="/grow-check"}> 이렇게 사용하시면 됩니다.

import { useRouter } from "next/router";
import Image from "next/image";

interface UndoButtonProps {
  icon: string;
  altText?: string;
  path?: string;
}

const UndoXButton: React.FC<UndoButtonProps> = ({
  icon,
  altText = "닫기",
  path,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (path) {
      router.push(path); // path가 있으면 특정 페이지로 이동
    } else {
      router.back(); // path가 없으면 이전 페이지로 이동
    }
  };
  return (
    <>
      <button type="button" onClick={handleClick}>
        <Image src={icon} alt={altText} />
      </button>
    </>
  );
};

export default UndoXButton;

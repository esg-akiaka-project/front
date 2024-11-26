// 컴포넌트 이름: WritingEntryButton
// 컴포넌트 설명: '도약기록 쓰기' fixed 버튼
// 주 사용처: 홈 화면, 도약기록 확인 탭의 하단 '도약기록 쓰기'버튼

// Dev Log
// 최초 작성일/작성자: 2024.11.01/루이
// 수정일/작성자/수정 내용: 2024.11.22/루이/오늘 이미 작성한 로그가 있으면 작성페이지에 들어가지 못하도록 설계

import { useRouter } from "next/router";
import Image from "next/image";
import { CSSProperties } from "styled-components";
import * as S from "./WritingEntryButton.style";
import iconPencil from "../../../public/assets/common/icon_pencil.svg";
import { usePostDataContext } from "@/src/context/PostDataContext";
import useLogsStore from "@/src/store/useLogStore";

interface WritingEntryButtonProps {
  onFail: () => void;
}

const WritingEntryButton: React.FC<WritingEntryButtonProps> = ({ onFail }) => {
  // 오늘 날짜로 작성된 log가 있는지 확인
  const getLogByDate = useLogsStore((state) => state.getLogByDate);
  const todayDate = new Date().toISOString().split("T")[0];
  const { resetPostData } = usePostDataContext();

  const router = useRouter();

  const handleClick = () => {
    const logId = getLogByDate(todayDate);
    if (logId) {
      console.log("오늘의 도약기록이 있습니다!");
      onFail();
    } else {
      console.log("오늘의 로그가 없습니다.");
      resetPostData();
      router.push("/grow-up-record");
    }
  };

  return (
    <S.ButtonLayout>
      <button type="button" onClick={handleClick}>
        <S.ContentWrapper>
          <Image
            src={iconPencil}
            alt="도약기록 쓰기 아이콘"
            style={imageStyle}
          />
        </S.ContentWrapper>
      </button>
    </S.ButtonLayout>
  );
};

export default WritingEntryButton;

const imageStyle: CSSProperties = {
  left: "50%",
};

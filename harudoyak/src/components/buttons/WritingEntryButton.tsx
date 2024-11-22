// 컴포넌트 이름: WritingEntryButton
// 컴포넌트 설명: '도약기록 쓰기' fixed 버튼
// 주 사용처: 홈 화면, 도약기록 확인 탭의 하단 '도약기록 쓰기'버튼

// Dev Log
// 최초 작성일/작성자: 2024.11.01./루이
// 수정일/작성자/수정 내용: 2024.11.22./루이/오늘 이미 작성한 로그가 있으면 작성페이지에 들어가지 못하도록 설계

import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styled, { CSSProperties } from "styled-components";
import iconPencil from "../../../public/assets/common/icon_pencil.svg";
import { usePostDataContext } from "@/src/context/PostDataContext";
import useLogsStore from "@/src/store/useLogStore";

const WritingEntryButton: React.FC = () => {
  const [todayLog, setTodayLog] = useState(false);

  // 오늘 날짜로 작성된 log가 있는지 확인
  const getLogByDate = useLogsStore((state) => state.getLogByDate);

  const todayDate = new Date().toISOString().split("T")[0];

  const checkTodayLog = () => {
    const logId = getLogByDate(todayDate);
    if (logId) {
      console.log("오늘의 도약기록이 있습니다!");
      setTodayLog(true);
    } else {
      console.log("오늘의 로그가 없습니다.");
    }
  };

  const { resetPostData } = usePostDataContext();
  const router = useRouter();
  const handleClick = () => {
    checkTodayLog();
    if (!todayLog) {
      resetPostData();
      router.push("/grow-up-record");
    } else {
      console.log(
        "이미 오늘의 도약기록을 작성하셨습니다. 내일 다시 작성해 주세요 :)",
      );
    }
  };

  return (
    <ButtonLayout>
      <button type="button" onClick={handleClick}>
        <ContentWrapper>
          <Image
            src={iconPencil}
            alt="도약기록 쓰기 아이콘"
            style={imageStyle}
          />
        </ContentWrapper>
      </button>
    </ButtonLayout>
  );
};

export default WritingEntryButton;

const imageStyle: CSSProperties = {
  left: "50%",
};

const ButtonLayout = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 100px;
  right: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  background-color: var(--main-green);
  padding: 15px 15px;
  border-radius: 55px;
  border: 1px solid #ccc;
  align-items: center;
  width: 30px;
  height: 30px;
  justify-content: center;
`;

const Text = styled.p`
  font-size: 0.94rem;
  font-weight: bold;
  color: #ffffff;
  padding: 0px;
  margin: 0px;
`;

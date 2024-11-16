import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import moment from "moment";
import Image from "next/image";
import checkBox from "../../../public/assets/home/checkBox.svg";
import { useRouter } from "next/router";
import Modal from "./Modal";
import { useUserStore } from "@/src/store/useUserStore";
import useLogsStore from "@/src/store/useLogStore";
import { fetchRecordList, RecordItem } from "../../apis/logsApi";
import { format } from "date-fns";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const MonthlyCalendar: React.FC = () => {
  const today: Date = new Date(); // 현재 날짜 및 시간
  const [date, setDate] = useState<Value>(today);

  const [recordDayList, setRecordDayList] = useState<string[]>([]);
  const { memberId } = useUserStore();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetchRecordList();
        // creationDate 값들만 추출하여 recordDayList 배열에 값 업데이트
        setRecordDayList(
          response.map((item: RecordItem) => item.creationDate.substring(0, 10))
        );
        const logData = response.map((item: RecordItem) => ({
          logId: item.logId,
          creationDate: format(new Date(item.creationDate), "yyyy-MM-dd"),
        }));
        useLogsStore.getState().setLogs(logData);
      } catch (error) {
        console.error("Failed to fetch record list:", error);
        throw error;
      }
    };

    if (memberId) {
      fetchList();
    }
  }, [memberId]);

  const formatDate = (date: Date) =>
    date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, "-") // 점을 대시로 변경
      .replace(/\s/g, "") // 공백 제거
      .replace(/-$/, ""); // 마지막에 있는 '-' 제거

  const [open, setOpen] = useState<boolean>(false); // Modal state

  const router = useRouter();

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };

  const handleDateClick = (value: Date) => {
    const formattedValue = formatDate(value);
    const formattedToday = formatDate(today);

    switch (true) {
      // 로그인이 안 한 상태 - 경고창 팝업
      case memberId === null:
        alert("로그인을 먼저 해주세요");
        break;

      // 작성된 기록 있음 - 일간 기록 확인 페이지로 이동
      case recordDayList.includes(formattedValue):
        console.log("doyak push");
        console.log(formattedValue);
        router.push(
          {
            pathname: "/grow-check",
            query: {
              dayToSelect: formattedValue,
            },
          },
          `/grow-check/` // query masking
        );
        break;

      // 작성된 기록 없음 && 클릭한 날짜가 오늘 - 기록 작성 페이지로 이동
      case !recordDayList.includes(formattedValue) &&
        formattedValue === formattedToday:
        router.push("/grow-up-record");
        break;

      // 작성된 기록 없음 && 클릭한 날짜가 오늘이 아님 - 모달 팝업
      case !recordDayList.includes(formattedValue) &&
        formattedValue !== formattedToday:
        setOpen(true);
        break;

      default:
        break;
    }
  };

  return (
    <StyledCalendarWrapper>
      <StyledCalendar
        locale="ko"
        value={date}
        onChange={handleDateChange}
        formatDay={(locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
        formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
        formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
        calendarType="gregory" // 일요일 부터 시작
        showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
        next2Label={null} // +1년 & +10년 이동 버튼 숨기기
        prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
        minDetail="year" // 10년단위 년도 숨기기
        onClickDay={(value: Date) => {
          // console.log("Selected day:", value); // 선택한 날짜 출력
          handleDateClick(value); // 선택한 날짜에 대한 추가 처리
        }}
        tileContent={({ date }) => {
          const html = [];
          if (
            recordDayList.find((x) => x === moment(date).format("YYYY-MM-DD"))
          ) {
            html.push(
              <StyledCheckbox
                className="checkbox"
                src={checkBox}
                alt="recorded"
                key={moment(date).format("YYYY-MM-DD")}
              />
            );
          }
          return <>{html}</>;
        }}
      />
      {open && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <div>
            선택한 날짜에<br></br>작성된 기록이 없습니다
          </div>
        </Modal>
      )}
    </StyledCalendarWrapper>
  );
};

export default MonthlyCalendar;

// style
const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 3% 5%;
    background-color: var(--white-from-grayscale);
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      color: var(--darkgray-from-grayscale);
      font-family: Inter;
    }
  }

  /* 요일 폰트만 sub-green2 */
  .react-calendar__month-view__weekdays__weekday abbr {
    color: var(--sub-green2);
  }

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    justify-content: center;
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 1rem;
    text-align: center;
    color: var(--darkgray-from-grayscale);
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:focus {
    background-color: var(--white-from-grayscale);
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
    background-color: var(--white-from-grayscale);
    color: var(--darkgray-from-grayscale);
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    text-align: center;
    flex-grow: 0 !important;
  }

  /* 년/월 상단 네비게이션 > 버튼 설정 */
  react-calendar__navigation__arrow react-calendar__navigation__next-button {
    padding: 10%;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: var(--background);
    border-radius: 0.3rem;
  }

  /* 오늘 날짜 하이라이트 */
  .react-calendar__tile--now {
    background: var(--sub-green3);
    border-radius: 0.3rem;
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    border-radius: 0.8rem;
    background-color: var(--white-from-grayscale);
    padding: 0;
  }

  /* 네비게이션 현재 월 스타일 적용 */
  .react-calendar__tile--hasActive {
    background-color: var(--sub-green3);
    abbr {
      color: var(--white-from-grayscale);
    }
  }

  /* 일 날짜 간격 */
  .react-calendar__tile {
    min-height: 46px;
    padding: 5px 0px 18px;
    position: relative;
    img {
      margin: 3;
    }
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 20px 6.6667px;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--darkgray-from-grayscale);
  }
`;

const StyledCalendar = styled(Calendar)``;

// 체크박스 이미지 스타일 설정
const StyledCheckbox = styled(Image)`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
`;

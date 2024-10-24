import React, {useState} from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";
import moment from "moment";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const MonthlyCalendar: React.FC = () => {
    const today = new Date();
    const [date, setDate] = useState<Value>(today);

    const handleDateChange = (newDate: Value) => {
        setDate(newDate);
    }

    return (
        <StyledCalendarWrapper>
            <StyledCalendar
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
             />
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
        width: 90%;
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
        justify-content: center
    }

    /* 네비게이션 폰트 설정 */
    .react-calendar__navigation button {
        font-weight: 800;
        font-size: 1rem;
        color: var(--darkgray-from-grayscale);
    }

    /* 네비게이션 버튼 컬러 */
    .react-calendar__navigation button:focus {
        background-color: white;
    }

    /* 네비게이션 비활성화 됐을때 스타일 */
    .react-calendar__navigation button:disabled {
        background-color: white;
        color: ${(props) => props.theme.darkBlack};
    }

    /* 년/월 상단 네비게이션 칸 크기 줄이기 */
    .react-calendar__navigation__label {
        flex-grow: 0 !important;
    }

    /* 요일 밑줄 제거 */
    .react-calendar__month-view__weekdays abbr {
        text-decoration: none;
        font-weight: 800;
    }

    /* 오늘 날짜 폰트 컬러 */
    .react-calendar__tile--now {
        background: var(--sub-green3);
        border-radius: 0.3rem;
    }

    /* 네비게이션 월 스타일 적용 */
    .react-calendar__year-view__months__month {
        border-radius: 0.8rem;
        background-color: ${(props) => props.theme.gray_5};
        padding: 0;
    }

    /* 네비게이션 현재 월 스타일 적용 */
    .react-calendar__tile--hasActive {
        background-color: ${(props) => props.theme.primary_2};
        abbr {
        color: white;
        }
    }

    /* 일 날짜 간격 */
    .react-calendar__tile {
        padding: 5px 0px 18px;
        position: relative;
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
        color: ${(props) => props.theme.gray_1};
    }


`;

const StyledCalendar = styled(Calendar)``;

/* 출석한 날짜에 점 표시 스타일 */
export const StyledDot = styled.div`
  background-color: ${(props) => props.theme.br_2};
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
`;


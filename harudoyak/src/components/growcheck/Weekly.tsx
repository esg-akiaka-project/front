import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  format,
  addDays,
  startOfWeek,
  addWeeks,
  subWeeks,
  isSameMonth,
  endOfMonth,
  isAfter,
} from "date-fns";

interface WeeklyProps {
  selectedDate: Date;
  onDayClick: (date: Date) => void;
  selectedDay: Date | null;
  onWeekChange: (newDate: Date) => void;
}

const Weekly: React.FC<WeeklyProps> = ({
  selectedDate,
  onDayClick,
  selectedDay,
  onWeekChange,
}) => {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    startOfWeek(selectedDate, { weekStartsOn: 1 }),
  );

  useEffect(() => {
    if (selectedDay) {
      setCurrentWeekStart(startOfWeek(selectedDay, { weekStartsOn: 1 }));
    } else {
      setCurrentWeekStart(startOfWeek(selectedDate, { weekStartsOn: 1 }));
    }
  }, [selectedDay, selectedDate]);

  const handleNextWeek = () => {
    const nextWeekStart = addWeeks(currentWeekStart, 1);
    setCurrentWeekStart(nextWeekStart);
    onWeekChange(nextWeekStart);
  };

  const handlePrevWeek = () => {
    const prevWeekStart = subWeeks(currentWeekStart, 1);
    if (!isFirstWeekOfMonth()) {
      setCurrentWeekStart(prevWeekStart);
      onWeekChange(prevWeekStart); // 주간 변경 시 부모 컴포넌트에 알림
    }
  };

  const isFirstWeekOfMonth = () => {
    const startOfPreviousWeek = subWeeks(currentWeekStart, 1);
    return !isSameMonth(currentWeekStart, startOfPreviousWeek);
  };

  const isLastWeekOfMonth = () => {
    const startOfNextWeek = addWeeks(currentWeekStart, 1);
    const endOfCurrentMonth = endOfMonth(currentWeekStart);
    return isAfter(startOfNextWeek, endOfCurrentMonth);
  };

  const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
  const weekDates = daysOfWeek.map((day, index) => {
    const date = addDays(currentWeekStart, index);
    return {
      day,
      date,
      formattedDate: format(date, "dd"),
    };
  });

  return (
    <WeekContainer>
      <ArrowButton
        onClick={handlePrevWeek}
        disabled={isFirstWeekOfMonth()}
        style={{ marginLeft: "3px" }}
      >
        {"<"}
      </ArrowButton>
      {weekDates.map((dayInfo, index) => (
        <DayBox
          key={index}
          onClick={() => onDayClick(dayInfo.date)}
          $isSelected={
            selectedDay &&
            selectedDay.toDateString() === dayInfo.date.toDateString()
          }
        >
          <Day>{dayInfo.day}</Day>
          <DateText>{dayInfo.formattedDate}</DateText>
        </DayBox>
      ))}
      <ArrowButton
        onClick={handleNextWeek}
        disabled={isLastWeekOfMonth()}
        style={{ marginRight: "3px" }}
      >
        {">"}
      </ArrowButton>
    </WeekContainer>
  );
};

export default Weekly;

const WeekContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 11px;
  padding: 8px 4px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const DayBox = styled.div<{ $isSelected: boolean | null }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ $isSelected }) =>
    $isSelected
      ? `
    border-radius: 0.5rem;
    background-color: rgba(1000,1000,1000,0.5); 
    width: 10%;
    `
      : `width: 10%
  `}
`;

const Day = styled.span`
  font-size: 12px;
  color: var(--darkgray-from-grayscale);
  margin-top: 4px;
`;

const DateText = styled.span`
  font-size: 13px;
  color: #666;
  margin-top: 8px;
  margin-bottom: 6px;
  font-weight: 1000;
  padding: 0;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--darkgray-from-grayscale);
  &:disabled {
    color: var(--gray-from-grayscale); /* 비활성화된 버튼 색상 */
    cursor: not-allowed;
  }

  &:hover:enabled {
    color: #4caf50;
  }
`;

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
}

const Weekly: React.FC<WeeklyProps> = ({
  selectedDate,
  onDayClick,
  selectedDay,
}) => {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    startOfWeek(selectedDate, { weekStartsOn: 1 })
  );

  useEffect(() => {
    if (selectedDay) {
      setCurrentWeekStart(startOfWeek(selectedDay, { weekStartsOn: 1 }));
    } else {
      setCurrentWeekStart(startOfWeek(selectedDate, { weekStartsOn: 1 }));
    }
  }, [selectedDay, selectedDate]);

  const handleNextWeek = () => {
    setCurrentWeekStart((prevWeekStart) => addWeeks(prevWeekStart, 1));
  };

  const handlePrevWeek = () => {
    if (!isFirstWeekOfMonth()) {
      setCurrentWeekStart(subWeeks(currentWeekStart, 1));
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
      <ArrowButton onClick={handlePrevWeek} disabled={isFirstWeekOfMonth()}>
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
      <ArrowButton onClick={handleNextWeek} disabled={isLastWeekOfMonth()}>
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
  margin-top: 16px;
  padding: 8px 16px;
  border-radius: 8px;
`;

const DayBox = styled.div<{ $isSelected: boolean | null }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ $isSelected }) =>
    $isSelected
      ? `
    border-radius: 0.6rem;
    background-color: white; 
    // border: 1px solid #4caf50; 
    width: 8%
    `
      : `width: 8%
  
  `}
`;

const Day = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const DateText = styled.span`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  font-weight: 1000;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;

  &:disabled {
    color: #ccc; /* 비활성화된 버튼 색상 */
    cursor: not-allowed;
  }

  &:hover:enabled {
    color: #4caf50;
  }
`;

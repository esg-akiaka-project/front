import React, { useState, useEffect } from "react";
import styled from "styled-components";

import WritingEntryButton from "@/src/components/buttons/WritingEntryButton";
import Dropdown from "@/src/components/growcheck/Dropdown";
import SelectMonWeek from "@/src/components/growcheck/SelectMonWeek";
import Weekly from "@/src/components/growcheck/Weekly";
import TodayFeel from "@/src/components/growcheck/TodayFeel";
import WeekFeel from "@/src/components/growcheck/WeekFeel";
import MonthFeel from "@/src/components/growcheck/MonthFeel";
// todo: 알람에서 주/월, 당일 피드백에 대해서 클릭을 하면 props로 해당하는 기간을 주고 그에따라 변수를 조정해
//  도약 기록 페이지 일/주/월 에따른 페이지 모습이 나오게 해야함
import { addDays, startOfWeek } from "date-fns";
import { useRouter } from "next/router";

const GrowCheckHome: React.FC = () => {
  const router = useRouter();
  const currentMonth = new Date().getMonth();

  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedMode, setSelectedMode] = useState<"Month" | "Week">("Week");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null); // weekly에서 선택한 날

  // router.query 이용해서 들어오면 가능함

  useEffect(() => {
    if (router.query.dayToSelect) {
      const dayToSelect = new Date(router.query.dayToSelect as string);
      setSelectedDay(dayToSelect);
      setSelectedMonth(dayToSelect.getMonth());
      setSelectedDate(dayToSelect);
    }
  }, [router.query.dayToSelect]); // dayToSelect 변경 시 effect 실행

  useEffect(() => {
    if (selectedMonth === currentMonth) {
      setSelectedDate(new Date());
    } else {
      const newDate = new Date(new Date().getFullYear(), selectedMonth, 1);
      setSelectedDate(newDate);
    }
  }, [selectedMonth, currentMonth]);
  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    setSelectedDay(null); // 월 변경 시 선택된 일자 초기화
    setSelectedDate(new Date(new Date().getFullYear(), month, 1));
  };

  const handleDayClick = (date: Date) => {
    if (selectedDay && selectedDay.getTime() === date.getTime()) {
      setSelectedDay(null);
    } else {
      setSelectedDay(date);
    }
  };

  const renderContent = () => {
    if (selectedMode === "Month") {
      return <MonthFeel />;
    } else {
      if (selectedDay) {
        return <TodayFeel selectedDay={selectedDay} />;
      } else {
        return <WeekFeel onDayClick={handleDayClick} />;
      }
    }
  };
  return (
    <GrowCheckWrapper>
      <EmptyContainer></EmptyContainer>
      <ControlContainer>
        <Dropdown
          selectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
        />
        <SelectMonWeek
          selectedMode={selectedMode}
          onToggleMode={setSelectedMode}
        />
      </ControlContainer>
      {selectedMode === "Week" ? (
        <Weekly
          selectedDate={selectedDate}
          onDayClick={handleDayClick}
          selectedDay={selectedDay}
        />
      ) : null}
      {renderContent()}
      <WritingEntryButton />
    </GrowCheckWrapper>
  );
};

export default GrowCheckHome;

const GrowCheckWrapper = styled.div`
  background-color: #cad3c4;
  overflow: auto;
  width: 100%;
  height: 100%;
  padding-bottom: 3.5rem;
`;

const ControlContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem;
`;

const EmptyContainer = styled.div`
  height: 63px;
`;

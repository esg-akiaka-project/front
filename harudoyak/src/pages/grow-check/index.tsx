import React, { useState, useEffect } from "react";
import styled from "styled-components";

import WritingEntryButton from "@/src/components/buttons/WritingEntryButton";
import Dropdown from "@/src/components/growcheck/Dropdown";
import SelectMonWeek from "@/src/components/growcheck/SelectMonWeek";
import Weekly from "@/src/components/growcheck/Weekly";
import TodayFeel from "@/src/components/growcheck/TodayFeel";
import WeekFeel from "@/src/components/growcheck/WeekFeel";
import MonthFeel from "@/src/components/growcheck/MonthFeel";

import { useRouter } from "next/router";
import { startOfWeek } from "date-fns";

const GrowCheckHome: React.FC = () => {
  const router = useRouter();
  const currentMonth = new Date().getMonth();

  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedMode, setSelectedMode] = useState<"Month" | "Week">("Week");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  useEffect(() => {
    if (router.isReady && router.query.dayToSelect) {
      const dayToSelect = new Date(router.query.dayToSelect as string);
      setSelectedDay(dayToSelect);
      setSelectedMonth(dayToSelect.getMonth());
      setSelectedDate(dayToSelect);
    }
  }, [router.isReady, router.query.dayToSelect]);

  useEffect(() => {
    if (selectedDay === null) {
      const newDate = new Date(new Date().getFullYear(), selectedMonth, 30);
      setSelectedDate(startOfWeek(newDate, { weekStartsOn: 1 }));
    }
  }, [selectedMonth]);

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month - 1);
    setSelectedDay(null);
  };

  const handleDayClick = (date: Date) => {
    setSelectedDay((prevSelectedDay) =>
      prevSelectedDay && prevSelectedDay.getTime() === date.getTime()
        ? null
        : date
    );
  };
  const handleWeekChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  const renderContent = () => {
    if (selectedMode === "Month") {
      return <MonthFeel selectedDate={selectedDate} />;
    } else {
      return selectedDay ? (
        <TodayFeel selectedDay={selectedDay} />
      ) : (
        <WeekFeel selectedDate={selectedDate} />
      );
    }
  };

  return (
    <GrowCheckWrapper>
      <EmptyContainer></EmptyContainer>
      <ControlContainer>
        <Dropdown
          selectedMonth={selectedMonth + 1}
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
          onWeekChange={handleWeekChange}
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

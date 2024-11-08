import React, { useState, useEffect } from "react";
import Root from "../../style/Root";
import styled from "styled-components";

import WritingEntryButton from "@/src/components/buttons/WritingEntryButton";
import Dropdown from "@/src/components/growcheck/Dropdown";
import SelectMonWeek from "@/src/components/growcheck/SelectMonWeek";
import Weekly from "@/src/components/growcheck/Weekly";
import TodayFeel from "@/src/components/growcheck/TodayFeel";
import WeekFeel from "@/src/components/growcheck/WeekFeel";
import MonthFeel from "@/src/components/growcheck/MonthFeel";

const GrowCheckHome: React.FC = () => {
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedMode, setSelectedMode] = useState<"Month" | "Week">("Week");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  useEffect(() => {
    if (selectedMonth === currentMonth) {
      setSelectedDate(new Date());
    } else {
      const newDate = new Date(new Date().getFullYear(), selectedMonth, 1);
      setSelectedDate(newDate);
    }
  }, [selectedMonth, currentMonth]);

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
          onMonthChange={setSelectedMonth}
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
  // margin-top: 63px;
  background-color: #cad3c4;
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

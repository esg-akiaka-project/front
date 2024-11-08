import React from "react";
import { format } from "date-fns";

interface TodayProps {
  selectedDay: Date;
}

const TodayFeel: React.FC<TodayProps> = ({ selectedDay }) => {
  return (
    <div>
      <p>today</p>

      <p>{format(selectedDay, "yyyy-MM-dd")}</p>
    </div>
  );
};

export default TodayFeel;

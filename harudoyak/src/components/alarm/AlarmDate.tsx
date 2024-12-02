import React from "react";
import styled from "styled-components";

const DateContainer = styled.div`
  font-size: 12px;
  color: #666;
  position: absolute;
  font-weight: regular;
  bottom: 10px;
  right: 10px;
  font-family: "Inter", sans-serif;
`;

const AlarmDate: React.FC<{ date: Date }> = ({ date }) => {
  return (
    <DateContainer>
      {`${new Date(date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })}
      ${new Date(date)
        .toLocaleDateString("en-US", { weekday: "short" })
        .toUpperCase()}`}
    </DateContainer>
  );
};

export default AlarmDate;

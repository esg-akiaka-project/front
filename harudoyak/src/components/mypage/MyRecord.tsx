import React from "react";
import styled from "styled-components";

interface RecordItemProps {
  title: string;
  value: string | number;
}
// todo: 데이터는 api 연동후에 다시 작성
const MyRecord: React.FC = () => {
  const records: RecordItemProps[] = [
    { title: "첫번째 하루도약", value: "2024.12.01" },
    { title: "하루도약 연속일", value: "15 days" },
    { title: "전체 하루도약", value: "37 번" },
  ];

  return (
    <RecordContainer>
      {records.map((record, index) => (
        <RecordItem key={index}>
          <RecordTitle>{record.title}</RecordTitle>
          <RecordValue>{record.value}</RecordValue>
        </RecordItem>
      ))}
    </RecordContainer>
  );
};

export default MyRecord;

const RecordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: #f5f5f5;
`;

const RecordItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 1rem;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const RecordTitle = styled.p`
  font-weight: bold;
  color: #333333;
  margin-bottom: 0.1rem;
`;

const RecordValue = styled.p`
  color: #666666;
`;

import React from "react";
import styled from "styled-components";
import { useUserStore } from "@/src/store/useUserStore";

interface RecordItemProps {
  title: string;
  value?: number | null;
}
// todo: firstDoyak 작성
const MyRecord: React.FC = () => {
  const { firstDoyak, recentContinuity, maxContinuity, shareDoyakCount } =
    useUserStore();
  // console.log(firstDoyak);
  const records: RecordItemProps[] = [
    // { title: "첫번째 하루도약", value: firstDoyak },

    { title: "하루도약 연속일", value: recentContinuity },
    { title: "전체 하루도약", value: shareDoyakCount },
    { title: "최장 연속일", value: maxContinuity },
  ];

  return (
    <RecordContainer>
      {records.map((record, index) => (
        <RecordItem key={index}>
          <RecordTitle>{record.title}</RecordTitle>
          {/* todo: type 맞추기 */}
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

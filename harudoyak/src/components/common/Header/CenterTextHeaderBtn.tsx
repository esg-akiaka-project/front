// 컴포넌트 이름: CenterTextHeaderBtn
// 컴포넌트 설명: CenterTextHeader 우측 가장자리에 들어가는 작은 '완료' 버튼
// 주 사용처: '도약기록 쓰기', 회원가입 flow 등에서 활용 가능
// 저장 위치: src/components/commom/Header/CenterTextHeaderBtn.tsx

// Dev Log
// 최초 작성일/작성자: 2024.10.25./루이
// 수정일/작성자:

import React from "react";
import styled from "styled-components";

interface CenterTextHeaderBtnProps {
  text: string;
}

const CenterTextHeaderBtn: React.FC<CenterTextHeaderBtnProps> = ({ text }) => {
  const handleSubmit = () => {
    

    
    console.log("Client to Server: ", text);
  };

  return (
    <>
      <Button onClick={handleSubmit}>완료</Button>
    </>
  );
};

export default CenterTextHeaderBtn;

// styled components
const Button = styled.button`
  display: flex;
  display: flex;
  color: #ffffff;
  background-color: var(--sub-green2);
  border-radius: 20px;
  width: 15%;
  min-width: 57px;
  height: 30px;
  text-align: center;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  font-size: 0.88rem;
`;

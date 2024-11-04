import React, { useState } from "react";
import MonthlyCalendar from "../components/home/MonthlyCalendar";
import styled, { CSSProperties } from "styled-components";
import Root from "./../style/Root";
import LoginButton from "../components/home/HomeLoginButton";
import WritingEntryButton from "@/src/components/buttons/WritingEntryButton";
import Modal from "@/src/components/home/Modal";
import Logo from "@/public/assets/common/OptimizedLogo.svg"
import { useUserStore } from "../store/useUserStore";

const Home: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const userId = useUserStore((state) => state.userId);
  const nickname = useUserStore((state) => state.nickname);

  return (
    <Root>
      <img src={Logo.src} width={120} height={80} alt="Logo" style={imageStyle} />
      
      {userId === null // 로그인 전, 후 조건부 렌더링
      ? <>
          <Wrapper>
            <Heading2>하루도약 시작하기</Heading2>
          </Wrapper>
          <LoginButton />
        </>
      : <Wrapper>
          <Heading2>{nickname}님<br></br>도약기록을 작성해주세요</Heading2>
        </Wrapper>
      }     

      <MonthlyCalendar></MonthlyCalendar>
      <div>
        <button onClick={() => setOpen(true)}>Modal</button>
        <Modal open={open} onClose={() => setOpen(false)}>선택한 날짜에 작성된 기록이 없습니다</Modal>
      </div>

      {userId === null ? null : <WritingEntryButton />}
    </Root>
  );
};

const imageStyle: CSSProperties = {
  position: "absolute",
  transform: "translateX(-50%)",
  left: "4.9rem",
  top: "4%"
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const Heading2 = styled.h2`
  font-size: 1.44rem;
  color: var(--main-green);
  padding: 3% 5%;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 10px;
`;

export default Home;

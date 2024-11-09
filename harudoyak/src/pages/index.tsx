import React, { useEffect, useState } from "react";
import MonthlyCalendar from "../components/home/MonthlyCalendar";
import styled, { CSSProperties } from "styled-components";
import Root from "./../style/Root";
import LoginButton from "../components/home/HomeLoginButton";
import WritingEntryButton from "@/src/components/buttons/WritingEntryButton";
import BeginningSetting from "../components/home/beginningSetting";
import { setAiGoal } from "../apis/authApi";
import Modal from "@/src/components/home/Modal";
import Logo from "@/public/assets/common/OptimizedLogo.svg";
import { useUserStore } from "../store/useUserStore";

const Home: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const nickname = useUserStore((state) => state.nickname);
  const aiName = useUserStore((state) => state.aiName);
  const { goalName, setAiName, setGoalName, memberId } =
    useUserStore.getState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (memberId && (!aiName || !goalName)) {
      setShowModal(true);
    }
  }, [aiName, goalName]);

  const handleSave = async (newAiName: string, newGoal: string) => {
    // 지금은 임의적으로 누르면 저장되게 했음, 회원가입 -로그인 로직이 후 수정해야함 todo:
    setShowModal(false);

    // try {
    //   const response = await setAiGoal(newAiName, newGoal);
    //   setAiName(response.aiName);
    //   setGoalId(response.goalId);
    //   setShowModal(false);
    // } catch (error) {
    //   console.error("AI 설정 저장 중 오류 발생:", error);
    // }
  };

  return (
    <Root>
      <img
        src={Logo.src}
        width={120}
        height={80}
        alt="Logo"
        style={imageStyle}
      />

      {memberId === null ? ( // 로그인 전, 후 조건부 렌더링
        <>
          <Wrapper>
            <Heading2>하루도약 시작하기</Heading2>
          </Wrapper>
          <LoginButton />
        </>
      ) : (
        <Wrapper>
          <Heading2>
            {nickname}님<br></br>도약기록을 작성해주세요
          </Heading2>
        </Wrapper>
      )}

      <MonthlyCalendar></MonthlyCalendar>

      <div>
        <button onClick={() => setOpen(true)}>Modal</button>
        <Modal open={open} onClose={() => setOpen(false)}>
          선택한 날짜에 작성된 기록이 없습니다
        </Modal>
      </div>

      {memberId === null ? null : <WritingEntryButton />}

      <WritingEntryButton />
      {showModal && <BeginningSetting onSave={handleSave} />}
    </Root>
  );
};

const imageStyle: CSSProperties = {
  position: "absolute",
  transform: "translateX(-50%)",
  left: "4.9rem",
  top: "4%",
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

import React, { useEffect, useState } from "react";
import MonthlyCalendar from "../components/home/MonthlyCalendar";
import styled from "styled-components";
import Root from "./../style/Root";
import LoginButton from "../components/home/HomeLoginButton";
import WritingEntryButton from "@/src/components/buttons/WritingEntryButton";
import BeginningSetting from "../components/home/beginningSetting";
import { useUserStore } from "../store/useUserStore";
import { setAiGoal } from "../apis/authApi";

const Home: React.FC = () => {
  const { aiName, goalId, setAiName, setGoalId } = useUserStore.getState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!aiName || !goalId) {
      setShowModal(true);
    }
  }, [aiName, goalId]);

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
      <Heading2>하루도약 시작하기</Heading2>
      <StyledLogin />
      <MonthlyCalendar></MonthlyCalendar>
      <WritingEntryButton />
      {showModal && <BeginningSetting onSave={handleSave} />}
    </Root>
  );
};

const Heading2 = styled.h2`
  font-size: 1.44rem;
  color: var(--main-green);
  padding: 3% 5%;
  text-align: center;
`;

const StyledLogin = styled(LoginButton)`
  display: flex;
  position: absolute;
  left: 50%;
`;

export default Home;

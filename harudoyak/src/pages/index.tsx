import React, { useEffect, useState } from "react";
import MonthlyCalendar from "../components/home/MonthlyCalendar";
import styled, { CSSProperties } from "styled-components";
import Root from "./../style/Root";
import LoginButton from "../components/home/HomeLoginButton";
import WritingEntryButton from "@/src/components/buttons/WritingEntryButton";
import BeginningSetting from "../components/home/beginningSetting";
import { changeAiname, changeGoal } from "../apis/authApi";
import Logo from "@/public/assets/common/DoyakiLogo.svg";
import { useUserStore } from "../store/useUserStore";
import Image from "next/image";
import TitleModal2 from "../components/growcheck/TitleModal2";

const Home: React.FC = () => {
  const { goalName, setAiName, setGoalName, memberId, nickname, aiName } =
    useUserStore();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModal2, setShowModal2] = useState(false);
  useEffect(() => {
    if (memberId && (aiName === "도약이" || !goalName)) {
      setShowModal(true);
    }
  }, [aiName, goalName, memberId]);

  const handleSave = async (newAiName: string, newGoal: string) => {
    try {
      const response = await changeAiname(newAiName);
      const response1 = await changeGoal(newGoal);

      setAiName(newAiName);
      setGoalName(newGoal);

      setShowModal(false);
    } catch (error) {
      console.error("AI 설정 저장 중 오류 발생:", error);
    }
  };

  return (
    <Root>
      {memberId === null ? ( // 로그인 전, 후 조건부 렌더링
        <>
          <Heading2>하루의 작은 도약을 쌓아보세요</Heading2>
          <P>
            하루도약은 도약이 AI 편지를 통해 작성된 도약 기록에 대한 응원과
            피드백을 제공해요.
          </P>
        </>
      ) : (
        <>
          <Heading2>
            {nickname}님의<br></br>하루 도약을 응원합니다.
          </Heading2>
          <P></P>
        </>
      )}

      <Image
        src={Logo.src}
        width={120}
        height={-10}
        alt="Logo"
        style={imageStyle}
        loading="lazy"
      />
      <MonthlyCalendar />

      {memberId === null ? (
        <FixedWrapper>
          <LoginButton />
        </FixedWrapper>
      ) : (
        <WritingEntryButton onFail={() => setShowModal2(true)} />
      )}

      {showModal && <BeginningSetting onSave={handleSave} />}
      {showModal2 && <TitleModal2 onClose={() => setShowModal2(false)} />}
    </Root>
  );
};

const imageStyle: CSSProperties = {
  position: "absolute",
  scale: "0.4",
  transform: "translate(520%, -150%)",
  zIndex: 2,
};

const Heading2 = styled.h2`
  font-size: 1.55rem;
  color: var(--main-green);
  padding: 0;
  text-align: left;
  margin: 0;
  margin-left: 5px;
  margin-top: 20px;
`;

const P = styled.p`
  color: var(--darkgray-from-grayscale);
  margin: 0;
  margin-left: 5px;
  margin-bottom: 70px;
  margin-top: 10px;
  font-size: 14px;
  width: 80%;
`;

const FixedWrapper = styled.div`
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
`;

export default Home;

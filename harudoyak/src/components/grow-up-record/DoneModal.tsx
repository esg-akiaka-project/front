import styled from "styled-components";
import Image from "next/image";
import doyakSticker from "../../../public/assets/grow-up-record/doyaksticker.svg";
import CloseButton from "./CloseButton";

const DoneModal: React.FC = () => {
  return (
    <ModalShadow>
      <ModalComponent>
        <Title>오늘의</Title>
        <Title>도약기록을 작성했어요!</Title>
        <StyledImageWrapper>
          <Image src={doyakSticker} alt="doyakSticker +1" />
        </StyledImageWrapper>
        <H3>내일 오전 7시에 </H3>
        <H3>도약이의 메세지가 도착할 예정이에요.</H3>
        <Margin />
        <P>오늘의 작은 기록이 큰 도약이 될 수 있도록</P>
        <P>도약기록이 응원할게요.</P>
        <CloseButton />
      </ModalComponent>
    </ModalShadow>
  );
};

export default DoneModal;

// styled-components
const ModalShadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalComponent = styled.div`
  background: #f2f6f3;
  border-radius: 10px;
  border: 0.3 solid var(--lightgray-from-grayscale);
  width: 85%;
  text-align: center;
  padding: 40px 10px;
`;

const Title = styled.h2`
  color: var(--main-green);
  margin: 0;
`;

const StyledImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 12px;
`;

const H3 = styled.h3`
  font-weight: bold;
  font-size: 15px;
  color: var(--darkgray-from-grayscale);
  margin: 0;
`;

const Margin = styled.div`
  height: 10px;
  margin: 0;
`;

const P = styled.p`
  font-size: 13px;
  color: var(--gray-from-grayscale);
  margin: 0;
`;

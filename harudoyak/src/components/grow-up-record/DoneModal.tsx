import styled from "styled-components";
import Image from "next/image";
import modalBGImage from "../../../public/assets/grow-up-record/modal_background_image.svg";
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
        <H3>10시간 후에 도약이의 메세지가 도착할 예정이에요.</H3>
        <P>도약기록을 작성하면 도약이가 점점 더 크게 성장해요.</P>
        <P>매일 하루를 도약이의 메세지와 함께 시작해 보세요.</P>
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
  padding: 60px 10px;
`;

const Title = styled.h2`
  color: var(--main-green);
  margin: 0;
`;

const StyledImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const H3 = styled.h3`
  font-weight: bold;
  font-size: 15px;
  color: var(--darkgray-from-grayscale);
`;

const P = styled.p`
  font-size: 13px;
  color: var(--gray-from-grayscale);
  margin: 0;
`;

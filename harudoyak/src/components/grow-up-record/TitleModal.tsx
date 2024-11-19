import * as S from "../home/Modal.style";
import styled from "styled-components";

interface TitleModalProps {
  onClose: () => void;
}

const TitleModal: React.FC<TitleModalProps> = ({ onClose }) => {
  return (
    <>
      <S.Background />
      <S.ModalSection>
        <S.Content>충분한 글을 작성해 주세요</S.Content>
        <S.Detail>
          하루도약의 AI, 도약이가 도약기록의 태그를 만들 수 있도록 50자~1,000자
          사이의 글을 작성해 주세요.
        </S.Detail>
        <Button type="button" onClick={onClose}>
          닫기
        </Button>
      </S.ModalSection>
    </>
  );
};

export default TitleModal;

const Button = styled.button`
  background: var(--main-green);
  border-radius: 15px;
  font:weight: bold;
  color: #ffffff;
  margin-top: 40px;
  width: 90%;
  height: 36px;
`;

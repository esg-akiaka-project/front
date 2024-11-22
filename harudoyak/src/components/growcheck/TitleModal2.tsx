import * as S from "../home/Modal.style";
import styled from "styled-components";
import { useRouter } from "next/router";

interface TitleModal2Props {
  onClose: () => void;
  shouldGoBack?: boolean;
}

const TitleModal2: React.FC<TitleModal2Props> = ({ onClose, shouldGoBack }) => {
  const router = useRouter();

  const handleClick = () => {
    if (shouldGoBack) {
      router.back(); // path가 있으면 이전으로 이동
    } else {
      onClose();
    }
  };

  return (
    <>
      <S.Background />
      <S.ModalSection>
        <S.Content>작성된 오늘의 도약기록이 있어요.</S.Content>
        <S.Detail>
          도약기록은 하루에 한 개만 작성할 수 있어요. <br />
          내일 작성해 주세요.
        </S.Detail>
        <Button type="button" onClick={handleClick}>
          닫기
        </Button>
      </S.ModalSection>
    </>
  );
};

export default TitleModal2;

const Button = styled.button`
  background: var(--main-green);
  border-radius: 15px;
  font:weight: bold;
  color: #ffffff;
  margin-top: 40px;
  width: 90%;
  height: 36px;
`;

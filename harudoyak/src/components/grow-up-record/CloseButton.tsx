import { useRouter } from "next/router";
import styled from "styled-components";

const CloseButton: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Button
        type="button"
        onClick={() => {
          router.back();
        }}
      >
        닫기
      </Button>
    </>
  );
};

export default CloseButton;

const Button = styled.button`
  background: var(--main-green);
  border-radius: 15px;
  font:weight: bold;
  color: #ffffff;
  margin-top: 40px;
  width: 90%;
  height: 36px;
`;

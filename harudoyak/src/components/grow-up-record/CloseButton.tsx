import { useRouter } from "next/router";
import styled from "styled-components";

const CloseButton: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Button
        type="button"
        onClick={() => {
          router.push("./grow-check");
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
  border-radius: 20px;
  font:weight: bold;
  color: #ffffff;
  margin-top: 40px;
  width: 90%;
  height: 40px;
`;

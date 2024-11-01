import styled from "styled-components";
import Image from 'next/image';

interface SubmitProps {
  emotion: string;
  text: string;
  tags: string[];
  show: boolean;
  onClick?: () => void;
}

const SubmitButton: React.FC<SubmitProps> = ({
  emotion,
  text,
  tags,
  onClick,
  show,
}) => {
  return (
    <Wrapper>
      {/*}
      <Testbutton
        $text={text}
        onClick={onClick}
        disabled={!text}
        $display={show}
      >
        {}
      </Testbutton> */}
    </Wrapper>
  );
};

export default SubmitButton;

// styled-components
const Testbutton = styled.button<{ $data: boolean; $display: boolean }>`
  background: ${({ $data }) => ($data === true ? "#3C7960" : "#D9D9D9")};
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  align-items: center;
  justify-content: center;
  display: ${({ $display }) => ($display ? "flex" : "None")};
  cursor: ${({ $data }) => ($data ? "pointer" : "not-allowed")};
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
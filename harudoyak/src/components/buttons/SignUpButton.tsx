import styled from "styled-components";

interface SignUpButtonProps {
  data: boolean;
  children: string;
  show: boolean;
  onClick?: () => void;
}
const Testbutton = styled.button<{ $data: boolean; $display: boolean }>`
  background: ${({ $data }) => ($data === true ? "#3C7960" : "#D9D9D9")};
  width: 80%;
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
const SignUpButton: React.FC<SignUpButtonProps> = ({
  data,
  children,
  onClick,
  show,
}) => {
  return (
    <Wrapper>
      <Testbutton
        $data={data}
        onClick={onClick}
        disabled={!data}
        $display={show}
      >
        {children}
      </Testbutton>
    </Wrapper>
  );
};

export default SignUpButton;

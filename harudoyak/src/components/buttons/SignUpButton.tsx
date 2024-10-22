import styled from "styled-components";

interface SignUpButtonProps {
  data: boolean;
  children: React.ReactNode;
}
const Testbutton = styled.button<{ data: boolean }>`
  background: ${({ data }) => (data === true ? "#3C7960" : "#D9D9D9")};
  width: 300px;
  height: 60px;
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const SignUpButton: React.FC<SignUpButtonProps> = ({ data, children }) => {
  return (
    <>
      <Testbutton data={data}>{children}</Testbutton>
    </>
  );
};

export default SignUpButton;

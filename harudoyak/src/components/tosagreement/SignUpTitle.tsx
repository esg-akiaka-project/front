import styled from "styled-components";

const Title = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
  justify-content: center;
  display: flex;
  margin-top: 3%;
`;

interface SignUpTitleProps {
  title: string;
}
const SignUpTitle: React.FC<SignUpTitleProps> = ({ title }) => {
  return <Title>{title}</Title>;
};

export default SignUpTitle;

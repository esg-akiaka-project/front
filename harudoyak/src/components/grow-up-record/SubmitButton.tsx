import styled from "styled-components";
import { PostData } from "../../hooks/usePostData";
import Image from "next/image";

interface SubmitButtonProps {
  data: PostData;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ data }) => {
  const handleSubmit = () => {
    // POST 요청 로직
    console.log("Client to Server: ", data);
  };
  return <Button onClick={handleSubmit}>기록하기</Button>;
};

export default SubmitButton;

// styled-components
const Button = styled.button`
  border-radius: 20px;
  background: #3c7960;
  width: 100%;
  padding: 10px 0px;
  color: #ffffff;
  font-size: 1.13rem;
  text-align: center;
  display: fixed;
  bottom: 0;
`;

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

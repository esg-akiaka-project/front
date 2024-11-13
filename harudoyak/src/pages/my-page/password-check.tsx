import React, { useState } from "react";
import { useRouter } from "next/router";
import Root from "../../style/Root";

import UndoAndPageName from "@/src/components/mypage/UndoAndPageName";
import { checkPassword } from "@/src/apis/authApi";
import styled from "styled-components";

const PasswordCheck: React.FC = () => {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const CheckPassword = async (pw: string) => {
    try {
      const response = await checkPassword(pw);

      router.push("/my-page/account-edit");
    } catch (error) {
      alert("비밀번호가 맞지 않습니다");
    }
  };
  return (
    <Root>
      <UndoAndPageName pageName={"계정관리"} />
      <PasswordWrapper>
        <StyledInputTitle>비밀번호 입력</StyledInputTitle>
        <StyledInput
          type="password"
          value={password}
          placeholder="비밀번호"
          onChange={handlePasswordChange}
        />
      </PasswordWrapper>
      <CheckButton onClick={() => CheckPassword(password)}>확인</CheckButton>
    </Root>
  );
};

export default PasswordCheck;

const PasswordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50%;
`;

const StyledInputTitle = styled.p`
  width: 90%;
  font-weight: bold;
  color: grey;
  text-align: left;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: none;
  width: 90%;
  height: 3rem;
  padding-left: 1rem;
`;

const CheckButton = styled.button`
  border: none;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: #60927d;
  margin-top: 1.5rem;
  display: block;
  width: 25%;
  margin-left: auto;
  margin-right: auto;
`;

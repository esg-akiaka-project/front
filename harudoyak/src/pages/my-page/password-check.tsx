import React, { useState } from "react";
import { useRouter } from "next/router";
import Root from "../../style/Root";

import UndoAndPageName from "@/src/components/mypage/UndoAndPageName";
import styled from "styled-components";

const PasswordCheck: React.FC = () => {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const CheckPassword = (pw: string) => {
    // 전역상태관리에 저장한 비밀번호와 같은 경우 다음 페이지로 이동하는 로직
    console.log(pw);
    router.push("/my-page/account-edit");
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

      {/* 근데 여기 비밀번호 변경 버튼을 넣으면 닉네임 변경이랑 따로 로직이 돌아가는건가?  */}
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
  width: 90%; /* 비밀번호 입력 텍스트를 비밀번호 칸과 왼쪽 정렬로 맞춤 */
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

import React, { useState } from "react";
import Root from "../../style/Root";
import UndoAndPageName from "@/src/components/mypage/UndoAndPageName";
import Avatar from "@/src/components/Avatar";
import styled from "styled-components";
import Image from "next/image";
import Camera from "@/public/assets/grow-up-record/icon_camera_grey.svg";
import InputField from "@/src/components/mypage/InputField";
import { changePassword } from "@/src/apis/authApi";

const AccountEdit: React.FC = () => {
  const [nickname, setNickname] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const savePassword = async () => {
    if (newPassword === confirmPassword) {
      // try {
      //   const response = await changePassword()
      // }
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };
  return (
    <Root>
      <UndoAndPageName pageName={"계정관리"} />
      <AvatarWrapper>
        <AvatarContainer>
          <Avatar />
          <CameraIconWrapper>
            <Image src={Camera} alt="카메라" width={25} height={25} />
          </CameraIconWrapper>
        </AvatarContainer>
      </AvatarWrapper>
      <InfoSection>
        <div>
          <Label>닉네임</Label>
          <NicknameDivWrapper>
            <InputField
              value={nickname}
              placeholder={"닉네임을 입력하세요"}
              onChange={handleNicknameChange}
            />
            <DuplicateCheckButton>중복확인</DuplicateCheckButton>
          </NicknameDivWrapper>
        </div>

        <div>
          <Label>이메일</Label>
          <InputField value={"asd123@naver.com"} disabled={true} />
        </div>
        <div>
          <Label>비밀번호 변경</Label>
          <InputField
            type="password"
            value={newPassword}
            placeholder="새 비밀번호"
            onChange={handleNewPasswordChange}
          />
          <br></br>
          <InputField
            type="password"
            value={confirmPassword}
            placeholder="새 비밀번호 확인"
            onChange={handleConfirmPasswordChange}
          />
        </div>
      </InfoSection>
      <SavePasswordButton onClick={savePassword}>
        비밀번호 변경
      </SavePasswordButton>
    </Root>
  );
};

export default AccountEdit;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10%;
`;

const AvatarContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const CameraIconWrapper = styled.div`
  position: absolute;
  right: 0.1rem;
  top: 5rem;
`;

const Label = styled.p`
  font-weight: bold;
  color: grey;
  margin: 0 0 0.5rem 0;
  text-align: left;
  width: 90%;
`;
const InfoSection = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const NicknameDivWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const DuplicateCheckButton = styled.button`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  margin-left: 0.5rem;
  background-color: #3c7960;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border: none;

  border-radius: 10px;
`;
const SavePasswordButton = styled.button`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  background-color: #3c7960;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  margin-top: 1rem;
  margin: 1rem auto;
`;

import React, { useState } from "react";
import Root from "../../style/Root";
import UndoAndPageName from "@/src/components/mypage/UndoAndPageName";
import Avatar from "@/src/components/Avatar";
import styled from "styled-components";
import Image from "next/image";
import Camera from "@/public/assets/grow-up-record/icon_camera_grey.svg";
import InputField from "@/src/components/mypage/InputField";
import { changeNickname, changePassword } from "@/src/apis/authApi";
import { useUserStore } from "@/src/store/useUserStore";
import { useRouter } from "next/router";

const AccountEdit: React.FC = () => {
  const router = useRouter();
  const [oldnickname, setOldNickname] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [oldPassword, setOldpassword] = useState<string>("");
  const { nickname, setNickname, clearToken } = useUserStore();

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldpassword(e.target.value);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldNickname(e.target.value);
  };
  const logout = () => {
    clearToken();
    router.push("/");
  };
  const savePassword = async () => {
    if (newPassword === oldPassword) {
      alert("기존 비밀번호와 새 비밀번호가 같습니다.");
    } else {
      try {
        const response = await changePassword(oldPassword, newPassword);
        console.log(response.data);
        alert("비밀번호 수정 완료");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const changeId = async () => {
    try {
      const response = await changeNickname(oldnickname);
      console.log(response.data);
      setNickname(oldnickname);
    } catch (error) {
      console.log(error);
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
        <LogoutButton onClick={logout}>로그아웃</LogoutButton>
      </AvatarWrapper>
      <InfoSection>
        <div>
          <Label>닉네임</Label>
          <NicknameDivWrapper>
            <InputField
              value={oldnickname}
              placeholder={"닉네임을 입력하세요"}
              onChange={handleNicknameChange}
            />
            <DuplicateCheckButton onClick={changeId}>
              중복확인
            </DuplicateCheckButton>
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
            value={oldPassword}
            placeholder="기존 비밀번호"
            onChange={handleOldPasswordChange}
          />
          <br></br>
          <InputField
            type="password"
            value={newPassword}
            placeholder="새 비밀번호 "
            onChange={handleNewPasswordChange}
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

const LogoutButton = styled.button`
  display: flex;
  margin-left: 1rem;
  align-items: end;
  font-weight: bold;
`;

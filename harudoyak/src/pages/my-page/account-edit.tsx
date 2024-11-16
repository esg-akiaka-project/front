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
import { uploadToS3 } from "@/src/apis/uploadToS3";
import { changeProfileImg } from "@/src/apis/authApi";

const AccountEdit: React.FC = () => {
  const router = useRouter();
  const [oldnickname, setOldNickname] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [oldPassword, setOldpassword] = useState<string>("");
  const { nickname, setNickname, clearToken, setProfileImage } = useUserStore();

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
      console.log(response);
      setNickname(oldnickname);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target.files?.[0];
    if (file) {
      try {
        const photoUrl = await uploadToS3(file);
        console.log("Photo Url:", photoUrl);
        setProfileImage(photoUrl);
        const response = await changeProfileImg(photoUrl);
      } catch (error) {
        console.error("이미지 파일 업로드 중 에러 발생:", error);
        alert("이미지 파일 업로드에 실패했습니다. 서버 상태를 확인해 주세요.");
      }
    }
  };

  return (
    <Root>
      <HeaderWrapper>
        <UndoAndPageName pageName={"계정관리"} />
        <LogoutButton onClick={logout}>로그아웃</LogoutButton>
      </HeaderWrapper>

      <AvatarWrapper>
        <AvatarContainer>
          <Avatar />
          <CameraIconWrapper>
            <CameraIconLabel>
              <Image src={Camera} alt="카메라" width={25} height={25} />
              <HiddenInput
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </CameraIconLabel>
          </CameraIconWrapper>
        </AvatarContainer>
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

const CameraIconLabel = styled.label`
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10%;
`;

const AvatarContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 10rem;
  height: 10rem;
`;

const CameraIconWrapper = styled.div`
  position: absolute;
  right: 0rem;
  bottom: 0rem;
  transform: translate(50%, 50%);
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
  font-weight: bold;
  margin-left: auto;
  margin-right: 2rem;
  background-color: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
`;
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

import React from "react";
import Image from "next/image";
import footprint from "@/public/assets/mypage/footprint.png";
import lock from "@/public/assets/mypage/lock.png";
import robot from "@/public/assets/mypage/robot.png";
import styled from "styled-components";
import { useRouter } from "next/router";

const UserOptionSection: React.FC = () => {
  const router = useRouter();

  const gotoSpecificPage = (pagename: string) => {
    router.push(`${pagename}`);
  };
  return (
    <OptionSectionWrapper>
      <OptionSection>
        <Pagediv>
          <Image
            src={lock}
            alt="Lock"
            width={50}
            height={50}
            onClick={() => gotoSpecificPage("/my-page/password-check")}
          />
          <p>계정관리</p>
        </Pagediv>
        <Pagediv>
          <Image
            src={robot}
            alt="Robot"
            width={50}
            height={50}
            onClick={() => gotoSpecificPage("/my-page/ainame-edit")}
          />
          <p>AI Info</p>
        </Pagediv>
        {/* <Pagediv>
          <Image
            src={footprint}
            alt="Footprint"
            width={50}
            height={50}
            onClick={() => gotoSpecificPage("password-check")} // todo: 이 부분 주소는 바꿔야함
          />
          <p>내 서로도약</p>
        </Pagediv> */}
      </OptionSection>
    </OptionSectionWrapper>
  );
};

export default UserOptionSection;

const OptionSectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const OptionSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
`;

const Pagediv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

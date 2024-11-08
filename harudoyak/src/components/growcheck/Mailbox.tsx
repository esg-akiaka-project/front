import React, { useState } from "react";
import styled from "styled-components";
import messageIcon from "../../Images/messageIcon.png";
import Image from "next/image";

interface MailProps {
  date?: Date;
  day?: string;
  content?: string;
}

interface MailListProps {
  mailList?: MailProps[] | null;
}

const MailBox: React.FC<MailListProps> = ({ mailList }) => {
  return (
    <>
      {mailList && mailList.length > 0 ? (
        mailList.map((mail, index) => (
          <MailWrapper key={index}>
            <UpperItems>
              <Image src={messageIcon} width={20} height={20} alt="message" />
              {mail.date ? mail.date.toDateString() : ""}
            </UpperItems>
            <p>{mail.content}</p>
          </MailWrapper>
        ))
      ) : (
        <NoMailMessage>메일이 없습니다.</NoMailMessage> // mailList가 없을 때 표시할 메시지
      )}
    </>
  );
};
export default MailBox;

const MailWrapper = styled.div`
  background-color: #e6efe5;
  border-radius: 2rem;
  padding: 1rem;
  color: #767676;
  margin-bottom: 1rem;
  box-shadow: 0.2rem 0.2rem 0.2rem 0.2rem #d5d5d5;
`;

const UpperItems = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 0.5rem;
`;

const NoMailMessage = styled.div`
  text-align: center;
  color: #767676;
  font-size: 1rem;
  padding: 1rem;
`;

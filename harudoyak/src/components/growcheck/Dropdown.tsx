import React, { useState } from "react";
import styled from "styled-components";
import dropdownbutton from "../../../public/assets/grow-check/dropdownbtn.svg";
import Image from "next/image";

interface DropdownProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  selectedMonth,
  onMonthChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectMonth = (month: number) => {
    onMonthChange(month + 1);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={handleToggleDropdown}>
        {selectedMonth}월 <Image src={dropdownbutton} alt="dropdownButton" />
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          {[0, 1, 2].map((row) => (
            <DropdownRow key={row}>
              {Array.from({ length: 4 }, (_, i) => row * 4 + i).map((month) => (
                <DropdownItem
                  key={month}
                  onClick={() => handleSelectMonth(month)}
                >
                  {month + 1}월
                </DropdownItem>
              ))}
            </DropdownRow>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  z-index: 1;
`;

const DropdownButton = styled.button`
  padding: 4px 16px;
  font-size: 1rem;
  justify-content: left;
  display: flex;
  color: grey;
  cursor: pointer;
  border: none;
  border-radius: 1.3rem;
  background-color: #ffffff;
  font-weight: bold;
  text-align: left;
  gap: 35px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 20rem;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-top: 0.5rem;
  z-index: 2000;
`;

const DropdownRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const DropdownItem = styled.button`
  padding: 4px 8px;
  cursor: pointer;
  border: none;
  background: none;
  font-size: 14px;
  border-radius: 4px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

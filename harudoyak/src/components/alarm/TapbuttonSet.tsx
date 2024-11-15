import React from 'react';
import styled from 'styled-components';

interface TapButtonProps {
  isActive: boolean;
  label: string;  // 필수 prop으로 label 설정
  onClick: () => void;
}

const Button = styled.button<TapButtonProps>`
  flex: 1;
  width: 174px;
  height: 59px;
  padding: 5px 3px;
  background-color: ${(props) => (props.isActive ? "#3C7960" : "#A5CBBC")};
  color: #ffffff;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 20px;
  margin-right: 10px;
  font-weight: 900;
  font-size: 18px;
  font-family: "Inter", sans-serif;
`;

const TapButton: React.FC<TapButtonProps> = ({ isActive, label, onClick }) => {
  return <Button isActive={isActive} onClick={onClick}>{label}</Button>;  // label을 정상적으로 사용
};

export default TapButton;
import React from "react";
import styled from "styled-components";

interface InputFieldProps {
  type?: string;
  value: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  value,
  placeholder,
  onChange,
  disabled,
}) => {
  return (
    <InputWrapper>
      <StyledInput
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
    </InputWrapper>
  );
};

export default InputField;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: none;
  width: 100%;
  height: 3rem;
  padding-left: 1rem;
`;

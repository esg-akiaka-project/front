import React from "react";
import styled from "styled-components";

interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFieldWrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <InputFieldWrapper>
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputFieldWrapper>
  );
};

export default InputField;

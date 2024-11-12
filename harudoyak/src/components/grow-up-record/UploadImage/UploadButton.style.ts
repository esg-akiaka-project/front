import styled from 'styled-components';

export const Label = styled.label`
  background: #ffffff;
  width: 8.4rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 6px;
  padding-bottom: 6px;
  cursor: pointer;
  white-space: nowrap;
`;

export const ButtonContents = styled.div`
  margin-left: 8px;
  font-size: 0.75rem;
  color: var(--gray-from-grayscale);
`;

export const HiddenInput = styled.input`
display: none;
`;
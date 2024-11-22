import React from "react";
import styled from "styled-components";

type propTypes = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Background = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalSection = styled.div`
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Content = styled.div`
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  background: #ff5a5f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

const Modal: React.FC<propTypes> = ({ open, onClose, children }) => {
  if (!open) {
    return null;
  }
  return (
    <>
      <Background onClick={onClose} />
      <ModalSection>
        <Content>{children}</Content>
        <Wrapper>
          <CloseButton type="button" onClick={onClose}>
            닫기
          </CloseButton>
        </Wrapper>
      </ModalSection>
    </>
  );
};

export default Modal;

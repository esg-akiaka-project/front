import React from 'react'
import styled from "styled-components";

type propTypes = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<propTypes> = ({open, onClose, children}) => {
     if(!open) {
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
  )
}

export default Modal

const Background = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 2;
  background-color: rgba(109, 109, 109, 0.6);
`;

const ModalSection = styled.div`
  width: 320px;
  height: 160px;
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--white-from-grayscale);
  padding: 16px;
  border-radius: 0.5rem
`;

const Content = styled.div`
  padding: 16px 0;
  text-align: center;
  color: var(--darkgray-from-grayscale);
  font-weight: bold;
  font-family: Inter;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 40px;
  padding: 0 16px;
  margin: 10px;
`;

const CloseButton = styled.button`
  background: var(--main-green);
  border-radius: 24px;
  width: 130px;
  cursor: pointer;
  text-align: center;
  color: var(--white-from-grayscale);
  font-weight: bold;
  font-family: Inter;
`;
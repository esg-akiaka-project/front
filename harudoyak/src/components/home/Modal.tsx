import React from "react";
import * as S from "./Modal.style";

type propTypes = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<propTypes> = ({ open, onClose, children }) => {
  if (!open) {
    return null;
  }
  return (
    <>
      <S.Background onClick={onClose} />
      <S.ModalSection>
        <S.Content>{children}</S.Content>
        <S.Wrapper>
          <S.CloseButton type="button" onClick={onClose}>
            닫기
          </S.CloseButton>
        </S.Wrapper>
      </S.ModalSection>
    </>
  );
};

export default Modal;

// components/login/PasswordResetModal.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { findPassword } from "@/src/apis/authApi";

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<"initial" | "success" | "error">(
    "initial"
  );

  const handleClose = () => {
    onClose();
    setEmail("");
    setStatus("initial");
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await findPassword(email);

      if (response.ok) {
        setStatus("success");
        setTimeout(() => {
          onClose();
          setStatus("initial");
          setEmail("");
        }, 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <Title>비밀번호 재설정</Title>

        {status === "initial" && (
          <Form onSubmit={handleSubmit}>
            <Description>
              가입하신 이메일 주소를 입력하시면,
              <br />
              새로운 비밀번호를 보내드립니다.
            </Description>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소 입력"
              required
            />
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? "처리중..." : "비밀번호 재설정 메일 받기"}
            </SubmitButton>
          </Form>
        )}

        {status === "success" && (
          <SuccessMessage>
            <p>비밀번호 재설정 메일이 발송되었습니다!</p>
            <p>이메일을 확인해 주세요.</p>
          </SuccessMessage>
        )}

        {status === "error" && (
          <ErrorMessage>
            <p>메일 발송에 실패했습니다.</p>
            <p>다시 시도해 주세요.</p>
            <RetryButton onClick={() => setStatus("initial")}>
              다시 시도
            </RetryButton>
          </ErrorMessage>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 2rem;
  border-radius: 2rem;
  width: 90%;
  max-width: 25rem;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--gray-from-grayscale);

  &:hover {
    color: var(--main-green);
  }
`;

const Title = styled.h2`
  color: var(--main-green);
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  color: var(--gray-from-grayscale);
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid var(--sub-green2);
  border-radius: 0.5rem;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: var(--main-green);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 3rem;
  background: var(--main-green);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.5rem;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:disabled {
    background: var(--sub-green2);
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  text-align: center;
  padding: 20px 0;

  p {
    margin: 8px 0;
    line-height: 1.5;
  }
`;

const SuccessMessage = styled(Message)`
  color: var(--main-green);
`;

const ErrorMessage = styled(Message)`
  color: var(--error-red);
`;

const RetryButton = styled.button`
  margin-top: 16px;
  padding: 8px 16px;
  background: none;
  border: 1px solid var(--error-red);
  border-radius: 4px;
  color: var(--error-red);
  cursor: pointer;

  &:hover {
    background: var(--error-red);
    color: white;
  }
`;

export default PasswordResetModal;

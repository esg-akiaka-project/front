import styled from 'styled-components';

export const Background = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 2;
  background-color: rgba(109, 109, 109, 0.6);
`;

export const ModalSection = styled.div`
  width: 300px;
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--white-from-grayscale);
  padding: 20px 5px;
  border-radius: 0.5rem
  background: #f2f6f3;
  border-radius: 10px;
  border: 0.3 solid var(--lightgray-from-grayscale);
  width: 85%;
  text-align: center;
  padding: 60px 30px;
`;

export const Content = styled.div`
  padding: 16px 0;
  text-align: center;
  color: var(--darkgray-from-grayscale);
  font-weight: bold;
  font-family: Inter;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 40px;
  padding: 0 16px;
  margin: 10px;
  
`;

export const CloseButton = styled.button`
  background: var(--main-green);
  border-radius: 24px;
  width: 100%;
  cursor: pointer;
  text-align: center;
  color: var(--white-from-grayscale);
  font-weight: bold;
  font-family: Inter;
`;

export const Detail = styled.p`
  font-size: 13px;
  color: var(--gray-from-grayscale);
  margin: 0;
`;

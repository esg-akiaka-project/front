import styled from "styled-components";

interface DoneModalProps {
  clickModal: () => void;
}

const DoneModal: React.FC<DoneModalProps> = ({ clickModal }) => {
  
  

  return <ModalBox></ModalBox>;
};

// styled-components
const ModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

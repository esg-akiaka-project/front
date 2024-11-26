import styled from 'styled-components';

export const DoyakContent = styled.div`
  border-radius: 20px;
  background-color: white;
  border: 0.1px solid #3c7960;
  padding: 1rem;
  color: var(--darkgray-from-grayscale);
  height: 100%;
  width: 100%;
  margin-bottom: 44px;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: var(--main-green);
  font-size: 1.55rem;
  margin-top: 10px;
`;

export const DateTitle = styled(SectionTitle)`
  font-size: 1.8rem;
  font-weight: 1000;
  margin-top: 5px;
`;

export const MarginSectionTitle = styled(SectionTitle)`
  font-size: 1.55rem;
  margin-bottom: 11px;
`;

export const Container = styled.div`
  background-color: #f2f6f3;
  border-radius: 2rem 2rem 0 0;
  padding: 29px;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

export const MailWrapper = styled.div`
  position: relative;
  padding: 1rem;
  color: #767676;
  border-radius: 10px;
  background: linear-gradient(90deg, rgba(210, 205, 100, 0.10) 0%, rgba(110, 173, 107, 0.10) 100%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.10);
  margin-bottom: 5px;
`;

export const PotImageWrapper = styled.div`
  position: absolute;
  bottom: -1rem;
  right: 1rem;
  z-index: 1;
`;

export const ParellelWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 1rem;
`;

export const Margin = styled.div`
  width: 100%;
  height: 5px;
`;

export const BigMargin = styled.div`
  width: 100%;
  height: 50px;
`;

export const BottomMargin = styled.div`
  width: 100%;
  height: 6rem;
`;
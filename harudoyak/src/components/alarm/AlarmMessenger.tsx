import React from 'react';
import styled from 'styled-components';

const Messenger = styled.div`
  width: 90px;
  height: 33px;
  padding: 5px 10px;
  background-color: #ffffff;
  color: #3C7960;
  border-radius: 15px;
  font-size: 12px;
  font-weight: regular;
  justify-content: center;
  align-items: center;
  max-width: 85px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Inter, sans-serif;
  text-align: center;
`;

const AlarmMessenger: React.FC<{ label: string }> = ({ label }) => {
  return <Messenger>{label}</Messenger>;
};

export default AlarmMessenger;
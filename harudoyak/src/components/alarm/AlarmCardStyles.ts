import styled from "styled-components";

export const AlarmCardContainer = styled.div<{ isClicked: boolean }>`
  width: 353px;
  height: 143px;
  padding: 0px;
  margin-bottom: 30px;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${({ isClicked }) => (isClicked ? "rgba(121, 116, 126, 0.08)" : "rgba(110, 173, 107, 0.3)")};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Inter, sans-serif";
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 18px;
  font-weight: 900;
  text-shadow: 0.5px 0 0 #333;
  font-family: "Inter, sans-serif";
`;

export const Content = styled.div`
  font-size: 15px;
  line-height: 1.4;
  font-weight: 700;
  margin: 10px 0;
  color: #333;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;
  align-items: center;
`;

export const DateDisplay = styled.div`
  font-size: 12px;
  color: #666;
  position: absolute;
  font-weight: Regular;
  bottom: 10px;
  right: 10px;
  font-family: "Inter, sans-serif";
`;
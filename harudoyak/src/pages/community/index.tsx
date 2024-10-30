import React, { useState } from "react";
import Root from "../../style/Root";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

// 전체 폰트 설정 (Inter)
const GlobalStyle = createGlobalStyle`
font-family: 'Arial', sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between; /* 로고와 버튼 양쪽 정렬 */
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ddd;
  position: relative;
`;

const Logo = styled.div`
  text-align: center; /* 로고 중앙 정렬 */
  flex-grow: 1; /* 남는 공간을 차지하도록 설정 */
`;

const WriteButton = styled.button<{ clicked: boolean }>`
  width: 40px; /* 버튼 크기 */
  height: 40px; /* 버튼 크기 */
  background-color: ${({ clicked }) => (clicked ? "#4caf50" : "#3C7960")}; /* 클릭 시 색상 변경 */
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 중앙 정렬 */
  border: none;
  cursor: pointer;
  border-radius: 4px; /* 버튼 모서리 둥글게 */
  position: absolute;
  right: 16px; /* 오른쪽 위치 */
  opacity: ${({ clicked }) => (clicked ? 0.7 : 1)}; /* 클릭 시 투명도 조절 */
  transition: background-color 0.2s, opacity 0.2s; /* 색상 및 투명도 변화 애니메이션 */
`;

const PlusShapeContainer = styled.div`
  width: 24px; /* 전체 크기 */
  height: 24px; /* 전체 크기 */
  position: relative; /* 상대 위치 설정 */
`;

const HorizontalBar = styled.div`
  width: 100%; /* 가로선 너비 */
  height: 4px; /* 가로선 두께 */
  background-color: #ffffff; /* 선 색상 */
  position: absolute; /* 절대 위치 */
  top: 50%; /* 중앙 정렬 */
  left: 0;
  transform: translateY(-50%); /* 세로 중앙 정렬 */
`;

const VerticalBar = styled.div`
  width: 4px; /* 세로선 두께 */
  height: 100%; /* 세로선 높이 */
  background-color: #ffffff; /* 선 색상 */
  position: absolute; /* 절대 위치 */
  left: 50%; /* 중앙 정렬 */
  top: 0;
  transform: translateX(-50%); /* 가로 중앙 정렬 */
`;

const PostContainer = styled.div`
  width: 100%; /* 너비를 100%로 설정 */
  height: 577px; /* 포스트 높이 */
  display: flex;
  flex-direction: column; /* 세로 방향 정렬 */
  flex: 1;
  padding: 0; /* 내부 여백 제거 */
  margin: 16px; /* 외부 여백 설정 */
  background-color: #FFFFFF; /* 배경색 설정 */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

const PostHeader = styled.div`
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 수직 정렬 */
  margin-bottom: 8px; /* 아래쪽 여백 추가 */
  padding: 16px; /* 내부 여백 추가 */
  background-color: #f0f0f0; /* 배경색 추가 (원하는 경우) */
  border-radius: 4px; /* 모서리 둥글게 */
`;

const LevelBox = styled.div`
  width: 40px; /* 레벨 박스 너비 */
  height: 40px; /* 레벨 박스 높이 */
  background-color: #4caf50; /* 레벨 색상 */
  border-radius: 4px; /* 둥글게 처리 */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white; /* 텍스트 색상 */
  font-weight: bold; /* 텍스트 굵게 */
  margin-right: 8px; /* 오른쪽 여백 */
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column; /* 세로 방향 정렬 */
  margin-left: 8px; /* LevelBox와 간격 */
`;

const UserNick = styled.div`
  color: #777; /* 색상 설정 */
  font-size: 14px; /* 글씨 크기 */
  max-width: 100px; /* 최대 너비 설정 (10자 제한) */
  white-space: nowrap; /* 줄 바꿈 방지 */
  overflow: hidden; /* 넘치는 부분 숨김 */
  text-overflow: ellipsis; /* 생략 부호 추가 */
  margin-right: 8px; /* 오른쪽 여백 */
`;

const HashTag = styled.div`
  color: #007bff; /* 해시태그 색상 */
  font-size: 14px; /* 글씨 크기 */
`;

const PostImage = styled.img`
  width: 100%; /* 이미지 너비 */
  height: auto; /* 자동 높이 */
  border-radius: 4px; /* 모서리 둥글게 */
  margin-bottom: 8px; /* 아래쪽 여백 추가 */
`;

const PostReaction = styled.div`
  display: flex; /* 반응 표시를 위한 Flexbox */
  margin-bottom: 8px; /* 아래쪽 여백 추가 */
`;

const PostReactDoyakButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? "#4caf50" : "#ccc")}; /* 활성화 상태에 따른 색상 */
  border: none;
  border-radius: 4px; /* 둥글게 처리 */
  padding: 8px; /* 내부 여백 */
  cursor: pointer; /* 포인터 커서 */
  color: white; /* 글씨 색상 */
  display: flex;
  align-items: center; /* 수직 정렬 */
  margin-right: 4px; /* 버튼 간 간격 조절 */
`;

const DoyakIcon = styled.span`
  margin-right: 5px; /* 아이콘과 숫자 간격 */
`;

const PostReactCommentButton = styled.button`
  background-color: #007bff; /* 기본 색상 */
  border: none;
  border-radius: 4px; /* 둥글게 처리 */
  padding: 8px; /* 내부 여백 */
  cursor: pointer; /* 포인터 커서 */
  color: white; /* 글씨 색상 */
`;

const PostWriterContainer = styled.div`
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 중앙 정렬 */
  margin-top: 8px; /* 위쪽 여백 */
`;

const PostWriter = styled.div`
  font-size: 14px; /* 글씨 크기 */
  color: #555; /* 색상 설정 */
  margin-left: 8px; /* 왼쪽 여백 */
`;

const PostLetterIcon = styled.div`
  margin-right: 8px; /* 오른쪽 여백 */
`;

const PostLetter = styled.div`
  font-size: 14px; /* 글씨 크기 */
  color: #333; /* 색상 설정 */
  max-width: 70%; /* 최대 너비 설정 (70자 제한) */
`;

const CommunityHome: React.FC = () => {
  const [isDoyakActive, setDoyakActive] = useState(false);
  const [doyakCount, setDoyakCount] = useState(0); // 카운트 상태 추가
  const [writeButtonClicked, setWriteButtonClicked] = useState(false); // 글쓰기 버튼 상태

  const toggleDoyak = () => {
    setDoyakActive(!isDoyakActive);
    setDoyakCount(isDoyakActive ? 0 : 1); // 상태에 따라 카운트 변경
  };

  const handleWriteButtonClick = () => {
    setWriteButtonClicked(true);
    setTimeout(() => setWriteButtonClicked(false), 200); // 200ms 후에 원래 상태로 복귀
  };

  return (
    <Root>
      <GlobalStyle /> {/* 전역 스타일 적용 */}
      <Header>
        <Logo>
          {/* 여기에 로고를 추가하세요 */}
          <span>로고</span> {/* 임시 로고 텍스트 */}
        </Logo>
        <WriteButton clicked={writeButtonClicked} onClick={handleWriteButtonClick}>
          <PlusShapeContainer>
            <HorizontalBar /> {/* 수평선 */}
            <VerticalBar /> {/* 수직선 */}
          </PlusShapeContainer>
        </WriteButton>
      </Header>
      <PostContainer>
        <PostHeader>
          <LevelBox>Lv.1</LevelBox> {/* 레벨 박스 */}
          <UserInfo>
            <UserNick>(닉네임)</UserNick> {/* 닉네임만 표시 */}
            <HashTag>#도약플랜</HashTag> {/* 해시태그 표시 */}
          </UserInfo>
        </PostHeader>
        <PostImage src="image_url_here" alt="포스트 이미지" /> {/* 이미지 URL 추가 */}
        <PostReaction>
          <PostReactDoyakButton active={isDoyakActive} onClick={toggleDoyak}>
            <DoyakIcon>🌳</DoyakIcon> {/* 나무 아이콘 */}
            {doyakCount} {/* 카운트 표시 */}
          </PostReactDoyakButton>
          <PostReactCommentButton>
            댓글
          </PostReactCommentButton>
        </PostReaction>
        <PostWriterContainer>
          <PostLetterIcon>🌟</PostLetterIcon> {/* 아이콘 */}
          <PostWriter>
            supported by (닉네임) 설정 AI {/* 사용자 닉네임 + 설정 AI */}
          </PostWriter>
        </PostWriterContainer>
        <PostLetter>나의 성장 기록은 언제나 뿌듯해!</PostLetter> {/* 포스트 내용 */}
      </PostContainer>
    </Root>
  );
};

export default CommunityHome;


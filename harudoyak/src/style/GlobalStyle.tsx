import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  /* CSS 변수 정의 (필요에 따라 추가 가능) */
  :root {
    --main-bg-color: #ffffff;
    --main-font-color: #333333;
    --link-color: #1e90ff;
  }

  /* 기본적인 HTML 요소의 초기화 */
  html, body {
    margin: 0;
    padding: 0;
    font-size: 100%;
    font-family: 'Arial', sans-serif; /* 기본 폰트 설정 */
    background-color: var(--main-bg-color);
    color: var(--main-font-color);
    line-height: 1.6;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  /* 블록 요소 */
  article, aside, footer, header, nav, section {
    display: block;
  }

  /* 목록 스타일 초기화 */
  ol, ul {
    list-style: none;
  }

  /* 링크 스타일 초기화 */
  a {
    text-decoration: none;
    color: var(--link-color);
    &:hover {
      color: darken(var(--link-color), 10%);
    }
  }

  /* 이미지와 테이블 초기화 */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    padding: 0.5rem;
    text-align: left;
    border: 1px solid #ddd;
  }

  /* 모든 요소에 대해 box-sizing을 border-box로 설정 */
  *, *::before, *::after {
    box-sizing: inherit;
  }

  /* blockquote와 q 요소 초기화 */
  blockquote, q {
    quotes: none;
  }

  blockquote::before, blockquote::after,
  q::before, q::after {
    content: '';
  }
`;

export default GlobalStyle;


// pages/_app.tsx
// 공통 레이아웃 추가하기 (ex. Header, GlobalStyle, Redux 등)
// 페이지 내에서 전역적으로 적용할 내용 작성해 주시면 됩니다!

import type { AppProps } from "next/app";
import GlobalStyle from "../style/GlobalStyle";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle /> 
      <Component {...pageProps} />
    </>
  );
}

export default App;